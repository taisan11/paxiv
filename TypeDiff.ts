import * as ts from "typescript";

function parseInterface(code: string): Record<string, any> {
  const source = ts.createSourceFile("temp.ts", code, ts.ScriptTarget.Latest, true);
  const result: Record<string, any> = {};

  source.forEachChild(node => {
    if (ts.isInterfaceDeclaration(node)) {
      const interfaceName = node.name.text;
      const properties = node.members;
      const obj: Record<string, any> = {};

      for (const prop of properties) {
        if (ts.isPropertySignature(prop) && prop.type && prop.name) {
          const key = (prop.name as ts.Identifier).text;
          obj[key] = extractType(prop.type);
        }
      }

      result[interfaceName] = obj;
    }
  });

  return Object.values(result)[0]; // 最初のinterfaceのみ
}

function extractType(type: ts.TypeNode): any {
  if (ts.isTypeLiteralNode(type)) {
    const nested: Record<string, any> = {};
    for (const member of type.members) {
      if (ts.isPropertySignature(member) && member.name && member.type) {
        const key = (member.name as ts.Identifier).text;
        nested[key] = extractType(member.type);
      }
    }
    return nested;
  }

  if (ts.isTypeReferenceNode(type) && ts.isIdentifier(type.typeName)) {
    return type.typeName.text; // 型名（例えばstring, numberなど）
  }

  return type.getText(); // fallback
}

function diffObjects(a: any, b: any): { onlyInA: any, onlyInB: any } {
  const onlyInA: any = {};
  const onlyInB: any = {};

  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);

  for (const key of keys) {
    if (!(key in b)) {
      onlyInA[key] = a[key];
    } else if (!(key in a)) {
      onlyInB[key] = b[key];
    } else {
      if (typeof a[key] === "object" && typeof b[key] === "object") {
        const diff = diffObjects(a[key], b[key]);
        if (Object.keys(diff.onlyInA).length) onlyInA[key] = diff.onlyInA;
        if (Object.keys(diff.onlyInB).length) onlyInB[key] = diff.onlyInB;
      }
    }
  }

  return { onlyInA, onlyInB };
}

function typeDiff(codeA: string, codeB: string): { onlyInA: any, onlyInB: any } {
  const objA = parseInterface(codeA);
  const objB = parseInterface(codeB);
  return diffObjects(objA, objB);
}

console.log(typeDiff(`
                    interface illusts {
                    illust_id: string;
                    illust_user_id: string;
                    illust_title: string;
                    illust_ext: string;
                    illust_width: string;
                    illust_height: string;
                    illust_restrict: string;
                    illust_x_restrict: string;
                    illust_create_date: string;
                    illust_upload_date: string;
                    illust_server_id: string;
                    illust_hash: null;
                    illust_type: string;
                    illust_sanity_level: number;
                    illust_ad_safety_level: string;
                    illust_book_style: string;
                    illust_page_count: string;
                    illust_comment_off_setting: string;
                    illust_ai_type: string;
                    illust_mask_apple_app_store: string;
                    illust_mask_google_play_store: string;
                    illust_custom_thumbnail_upload_datetime: null;
                    user_account: string;
                    user_name: string;
                    url: string;
                    illust_mask_rule_set: {
                        _illust_mask: number;
                    };
                }`,`interface Illust {
    url: string;
    tags: string[];
    title_caption_translation: {
        work_title: null;
        work_caption: null;
    };
    is_mypixiv: boolean;
    is_private: boolean;
    is_howto: boolean;
    is_original: boolean;
    alt: string;
    url_s: string;
    url_sm: string;
    url_w: string;
    url_ss: null;
    url_big: null;
    url_placeholder: null;
    upload_timestamp: number;
    location_mask: boolean;
    id: string;
    user_id: string;
    title: string;
    width: string;
    height: string;
    restrict: string;
    x_restrict: string;
    type: string;
    sl: number;
    book_style: string;
    page_count: string;
    comment_off_setting: number;
    ai_type: number;
    comment: null;
    author_details: {
        user_id: string;
        user_name: string;
        user_account: string;
    };
}`))