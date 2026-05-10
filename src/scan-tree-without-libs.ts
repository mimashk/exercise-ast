import type { Heading, Node, Root, Text } from "mdast";

type MdAst = Root;

export function findAllHeadings(ast: MdAst): Heading[] {
  // TODO: implement code
  if (ast.type !== "root") {
    throw new Error("Invalid AST");
  }
  const headings: Heading[] = [];
  const visit = (node: Node) => {
    if (node.type === "heading") {
      headings.push(node as Heading);
    }
    if ("children" in node && Array.isArray(node.children)) {
      for (const child of node.children) {
        visit(child);
      }
    }
  };
  visit(ast);
  return headings;
}

export function findAll(ast: MdAst, nodeType: Node["type"]): Node[] {
  // TODO: implement code
  if (ast.type !== "root") {
    throw new Error("Invalid AST");
  }

  const nodes: Node[] = [];
  const visit = (node: Node) => {
    if (node.type === nodeType) {
      nodes.push(node);
    }
    if ("children" in node && Array.isArray(node.children)) {
      for (const child of node.children) {
        visit(child);
      }
    }
  };
  visit(ast);
  return nodes;
}

export function sanitize(text: MdAst, target: string): MdAst {
  // TODO: implement code
  if (text.type !== "root") {
    throw new Error("Invalid AST");
  }

  const maskWord = (text: string): string => {
    if (text.length <= 2) {
      return text[0] + "*" + text[text.length - 1];
    }
    return text[0] + "*".repeat(text.length - 2) + text[text.length - 1];
  };

  const tree = text;
  const visit = (node: Node) => {
    if (node.type === "text") {
      const textNode = node as Text;
      textNode.value = textNode.value.replaceAll(target, maskWord(target));
    }
    if ("children" in node && Array.isArray(node.children)) {
      for (const child of node.children) {
        visit(child as Node);
      }
    }
  };
  visit(tree);
  return tree;
}
