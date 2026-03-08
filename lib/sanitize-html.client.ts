import DOMPurify from "dompurify";

export function sanitizeClientUserOutput(input: string): string {
  return DOMPurify.sanitize(input);
}
