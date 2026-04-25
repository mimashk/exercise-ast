import type { Heading, Node, Root } from "mdast";

type MdAst = Root;

export function findAllHeadings(ast: MdAst): Heading[] {
  // TODO: implement code
}

export function findAll(ast: MdAst, nodeType: Node["type"]): Node[] {
  // TODO: implement code
}

export function sanitize(text: MdAst, target: string): MdAst {
  // TODO: implement code
}