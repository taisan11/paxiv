import {argv} from "bun"

async function generateTypeFromJson(url: string, typeName: string = "GeneratedType"): Promise<string> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }
    
    const jsonData: Record<string, any> = await response.json();
    
    function inferType(value: any): string {
        if (Array.isArray(value)) {
            if (value.length === 0) return "any[]";
            return `${inferType(value[0])}[]`;
        }
        if (value === null) return "null";
        switch (typeof value) {
            case "string": return "string";
            case "number": return "number";
            case "boolean": return "boolean";
            case "object": return generateObject(value);
            case "undefined": return "undefined";
            default: return "any";
        }
    }
    
    function generateInterface(obj: Record<string, any>, name: string = typeName): string {
        let result = `interface ${name} {\n`;
        for (const key in obj) {
            result += `    ${key}: ${inferType(obj[key])};\n`;
        }
        result += `}`;
        return result;
    }

    function generateObject(obj: Record<string, any>|any[], name: string = typeName): string {
        if (Array.isArray(obj)) {
            if (obj.length === 0) return "any[]";
            return `${generateObject(obj[0])}[]`;
        }
        let result = `{\n`;
        for (const key in obj) {
            result += `    ${key}: ${inferType(obj[key])};\n`;
        }
        result += `}`;
        return result;
    }
    
    return generateInterface(jsonData);
}

// 例: 使用例
// generateTypeFromJson(argv[2]).then(console.log).catch(console.error);
