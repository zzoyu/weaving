export const SCHEMA = {
  maxNameLength: 50,
  maxDescriptionLength: 200,
  maxProperties: 25,
  maxHashtags: 20,
  maxKeyLength: 30,
  maxValueLength: 1500,
} as const;

export type Schema = typeof SCHEMA;
