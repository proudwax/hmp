import {AbstractStorage} from './abstract-storage';

export class MemoryStorageService implements AbstractStorage {
  private _storage: { [key: string]: any } = {};

  get length(): number {
    return Object.keys(this._storage).length;
  }

  constructor() {
  }

  public setItem(key: string, value: string): void {
    this._storage[key] = value;
  }

  public getItem(key: string): string | null {
    return key in this._storage ? this._storage[key] : null;
  }

  public removeItem(key: string): void {
    delete this._storage[key];
  }

  public clear(): void {
    this._storage = {};
  }

  public key(index: number): string | null {
    const keys: string[] = Object.keys(this._storage);
    return keys[index] !== void 0 ? keys[index] : null;
  }
}
