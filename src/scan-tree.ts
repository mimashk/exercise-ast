import { findAndReplace } from "mdast-util-find-and-replace";
import type { Heading, Node, Root } from "mdast";
import { visit } from "unist-util-visit";

type MdAst = Root;

export function findAllHeadings(ast: MdAst): Heading[] {
  // TODO: implement code
  const headings: Heading[] = [];
  visit(ast, "heading", function (node, index, parent) {
    headings.push(node as Heading);
  });
  return headings;
}

export function findAll(ast: MdAst, nodeType: Node["type"]): Node[] {
  // TODO: implement code
  const nodes: Node[] = [];
  visit(ast, nodeType, function (node, index, parent) {
    nodes.push(node as Node);
  });
  return nodes;
}

export function sanitize(text: MdAst, target: string): MdAst {
  // TODO: implement code
  const maskWord = (text: string): string => {
    if (text.length <= 2) {
      return text[0] + "*" + text[text.length - 1];
    }
    return text[0] + "*".repeat(text.length - 2) + text[text.length - 1];
  };

  const tree = text;
  findAndReplace(tree, [[target, maskWord(target)]]);
  return tree;
}
