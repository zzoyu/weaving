export enum ErrorCode {
  NOT_FOUND = "42P01",
}

export interface SupabaseError {
  code: ErrorCode;
  message: string;
  details: string | null;
  hint: string | null;
  digest: string | null;
}
