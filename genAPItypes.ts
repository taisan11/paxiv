import { argv } from "bun";

/**
 * JSONオブジェクトからTypeScript型定義を生成するユーティリティ
 */

interface TypeGenerationOptions {
    indentSize?: number;
    detectDates?: boolean;
    analyzeAllArrayElements?: boolean;
    readonly?: boolean;
    maxArraySamples?: number;
    excludedKeys?: string[];
}

const DEFAULT_OPTIONS: Required<TypeGenerationOptions> = {
    indentSize: 2,
    detectDates: true,
    analyzeAllArrayElements: false,
    readonly: false,
    maxArraySamples: 100,
    excludedKeys: ["ads"],
};

function compareUnionType(a: string, b: string): number {
    const order = (type: string): number => {
        if (type === "undefined") return 1;
        if (type === "null") return 2;
        return 0;
    };
    const oa = order(a);
    const ob = order(b);
    if (oa !== ob) return oa - ob;
    return a.localeCompare(b);
}

function normalizeUnionTypes(types: Iterable<string>): string[] {
    return Array.from(new Set(Array.from(types))).sort(compareUnionType);
}

function buildUnion(types: Iterable<string>, fallback = "unknown"): string {
    const normalized = normalizeUnionTypes(types);
    if (normalized.length === 0) return fallback;
    if (normalized.length === 1) return normalized[0];
    return normalized.join(" | ");
}

function normalizedArrayUnion(itemTypes: string[]): string {
    const normalized = buildUnion(itemTypes);
    return normalized.includes("|") ? `(${normalized})[]` : `${normalized}[]`;
}

function toSafeKey(key: string): string {
    return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
    return typeof v === "object" && v !== null && !Array.isArray(v);
}

function isDateString(value: string): boolean {
    const isoDatePattern =
        /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?)?$/;
    if (!isoDatePattern.test(value)) return false;
    const date = new Date(value);
    return !isNaN(date.getTime());
}

function mergeObjectValues(
    objects: Record<string, unknown>[],
    options: Required<TypeGenerationOptions>,
    visited: WeakSet<object>,
    indent: number
): string {
    const propertyMap = new Map<string, unknown[]>();
    const total = objects.length;
    const excluded = new Set(options.excludedKeys);

    for (const obj of objects) {
        for (const [key, value] of Object.entries(obj).sort(([a], [b]) => a.localeCompare(b))) {
            if (excluded.has(key)) continue;
            if (!propertyMap.has(key)) propertyMap.set(key, []);
            propertyMap.get(key)!.push(value);
        }
    }

    if (propertyMap.size === 0) return "Record<string, unknown>";

    const indentStr = " ".repeat(options.indentSize * indent);
    const nextIndent = " ".repeat(options.indentSize * (indent + 1));
    const sortedKeys = Array.from(propertyMap.keys()).sort((a, b) => a.localeCompare(b));
    const properties: string[] = [];

    for (const key of sortedKeys) {
        const values = propertyMap.get(key)!;
        const hasNull = values.some((v) => v === null);
        const hasUndefined = values.length < total || values.some((v) => v === undefined);
        const nonNullValues = values.filter((v) => v !== null && v !== undefined);

        const objVals = nonNullValues.filter(isPlainObject) as Record<string, unknown>[];
        const otherVals = nonNullValues.filter((v) => !isPlainObject(v));

        let baseType: string;
        if (objVals.length > 0 && otherVals.length === 0) {
            baseType = mergeObjectValues(objVals, options, visited, indent + 1);
        } else {
            const inferred = nonNullValues.map((v) => inferType(v, options, visited));
            baseType = buildUnion(inferred, "unknown");
        }

        const unionParts = [baseType];
        if (hasNull) unionParts.push("null");
        const finalType = unionParts.length === 1 ? unionParts[0] : unionParts.join(" | ");

        const optional = hasUndefined ? "?" : "";
        const ro = options.readonly ? "readonly " : "";

        properties.push(`\n${nextIndent}${ro}${toSafeKey(key)}${optional}: ${finalType};`);
    }

    return `{${properties.join("")}\n${indentStr}}`;
}

function inferType(
    value: unknown,
    options: Required<TypeGenerationOptions>,
    visited: WeakSet<object>
): string {
    if (value === null) return "null";
    if (value === undefined) return "undefined";

    if (typeof value === "string" && options.detectDates && isDateString(value)) {
        return "string /* ISO Date */";
    }

    if (Array.isArray(value)) {
        if (value.length === 0) return "unknown[]";
        const samples = options.analyzeAllArrayElements
            ? value
            : value.slice(0, options.maxArraySamples);

        const objItems = samples.filter(isPlainObject) as Record<string, unknown>[];
        const otherItems = samples.filter((item) => !isPlainObject(item));

        if (objItems.length > 0 && otherItems.length === 0) {
            const merged = mergeObjectValues(objItems, options, visited, 0);
            return normalizedArrayUnion([merged]);
        }

        const itemTypes = samples.map((item) => inferType(item, options, visited));
        return normalizedArrayUnion(itemTypes);
    }

    if (isPlainObject(value)) {
        if (visited.has(value)) return "unknown /* 循環参照 */";

        visited.add(value);
        try {
            const excluded = new Set(options.excludedKeys);
            const entries = Object.entries(value)
                .filter(([key]) => !excluded.has(key))
                .sort(([a], [b]) => a.localeCompare(b));

            if (entries.length === 0) return "Record<string, unknown>";

            const props = entries.map(
                ([key, val]) => `${toSafeKey(key)}: ${inferType(val, options, visited)}`
            );
            return `{ ${props.join("; ")} }`;
        } finally {
            visited.delete(value);
        }
    }

    return typeof value;
}

function generateType(
    json: unknown,
    typeName: string,
    options: Required<TypeGenerationOptions>
): string {
    const visited = new WeakSet<object>();

    if (isPlainObject(json)) {
        const excluded = new Set(options.excludedKeys);
        const entries = Object.entries(json)
            .filter(([key]) => !excluded.has(key))
            .sort(([a], [b]) => a.localeCompare(b));

        const nextIndent = " ".repeat(options.indentSize);
        const ro = options.readonly ? "readonly " : "";

        const props = entries.map(([key, value]) => {
            return `\n${nextIndent}${ro}${toSafeKey(key)}: ${inferType(value, options, visited)};`;
        });

        return `interface ${typeName} {${props.join("")}\n}`;
    }

    return `type ${typeName} = ${inferType(json, options, visited)};`;
}

export async function generateTypeFromJsonUrl(
    url: string,
    typeName = "GeneratedType",
    options: TypeGenerationOptions = {}
): Promise<string> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }

    const jsonData: unknown = await response.json();
    const opts: Required<TypeGenerationOptions> = { ...DEFAULT_OPTIONS, ...options };
    return generateType(jsonData, typeName, opts);
}

// CLI
const url = argv[2];
const typeName = argv[3] ?? "GeneratedType";

if (!url) {
    console.error("Usage: bun genAPItypes.ts <url> [TypeName]");
    process.exit(1);
}

generateTypeFromJsonUrl(url, typeName)
    .then(console.log)
    .catch(console.error);
