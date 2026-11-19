export type TokenKind = "plain" | "comment" | "string" | "keyword" | "number" | "call";

export interface Token {
  kind: TokenKind;
  text: string;
}

const KEYWORDS = new Set(
  "def class return if elif else for in not and or is try except raise from import as with async await None True False self lambda pass continue break while yield".split(
    " ",
  ),
);

// Order matters: comments and strings first, so keywords inside them are not highlighted.
const PATTERN =
  /(#[^\n]*)|("""[\s\S]*?"""|'''[\s\S]*?'''|\b[rbfu]?"(?:\\.|[^"\\\n])*"|\b[rbfu]?'(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|`[^`\n]*`)|\b(\d+(?:\.\d+)?)\b|\b([A-Za-z_]\w*)\b(\()?/g;

/**
 * A deliberately tiny Python highlighter for short, static excerpts. It runs at build time on the
 * server, so no highlighting library ships to the client. Returns tokens grouped by line.
 */
export function highlightPython(code: string): Token[][] {
  const tokens: Token[] = [];
  let last = 0;

  for (const match of code.matchAll(PATTERN)) {
    const [whole, comment, string, number, word, paren] = match;
    const start = match.index;
    if (start > last) tokens.push({ kind: "plain", text: code.slice(last, start) });

    if (comment) tokens.push({ kind: "comment", text: comment });
    else if (string) tokens.push({ kind: "string", text: string });
    else if (number) tokens.push({ kind: "number", text: number });
    else if (word) {
      const kind: TokenKind = KEYWORDS.has(word) ? "keyword" : paren ? "call" : "plain";
      tokens.push({ kind, text: word });
      if (paren) tokens.push({ kind: "plain", text: paren });
    }
    last = start + whole.length;
  }
  if (last < code.length) tokens.push({ kind: "plain", text: code.slice(last) });

  // Split multi-line tokens (docstrings) so every line can carry its own number.
  const lines: Token[][] = [[]];
  for (const token of tokens) {
    token.text.split("\n").forEach((part, i) => {
      if (i > 0) lines.push([]);
      if (part) lines.at(-1)!.push({ kind: token.kind, text: part });
    });
  }
  return lines;
}
