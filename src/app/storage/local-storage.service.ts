import {AbstractStorage} from './abstract-storage';

export class LocalStorageService implements AbstractStorage {
  get length(): number {
    return this._storage.length;
  }

  constructor(private _storage: Storage) {
  }

  public setItem(key: string, value: string): void {
    this._storage.setItem(key, value);
  }

  public getItem(key: string): string | null {
    return this._storage.getItem(key);
  }

  public removeItem(key: string): void {
    this._storage.removeItem(key);
  }

  public clear(): void {
    this._storage.clear();
  }

  public key(index: number): string | null {
    return this._storage.key(index);
  }
}
