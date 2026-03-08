import sanitizeHtml from "sanitize-html";

export function sanitizeServerUserInput(input: string): string {
  return sanitizeHtml(input);
}
