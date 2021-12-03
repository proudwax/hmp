export abstract class AbstractStorage implements Storage {
  abstract length: number;

  abstract getItem(key: string): string | null;

  abstract setItem(key: string, value: string): void;

  abstract removeItem(key: string): void;

  abstract clear(): void

  abstract key(index: number): string | null;
}
