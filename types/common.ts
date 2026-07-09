/** Represents a nullable value */
export type Nullable<T> = T | null;

/** Represents an optional value */
export type Optional<T> = T | undefined;

/** Represents a dictionary of key-value pairs */
export type Dictionary<T> = Record<string, T>;

/** Represents a deeply readonly object */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

/** Represents a unique identifier */
export type ID = string;

/** Represents a timestamp */
export type Timestamp = string;

/** Represents a universally unique identifier */
export type UUID = string;
