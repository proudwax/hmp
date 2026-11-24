import {inject, Injectable, signal} from '@angular/core';
import type {CalculateSaved} from './calculate/calculate.type';
import {ConfigActiveService} from './config/config-active.service';
import {AppConfig} from './config/config.service';
import {APP_STORAGE} from './storage/storage.providers';

@Injectable()
export class AppService {
  private readonly _modes = inject(ConfigActiveService);
  private readonly _storage = inject(APP_STORAGE);
  private readonly _rows = signal<readonly CalculateSaved[]>(
    this._readRows(this._modes.active())
  );
  public readonly rows = this._rows.asReadonly();

  public selectMode(mode: AppConfig): void {
    if (!this._modes.hasMode(mode) || mode === this._modes.active()) {
      return;
    }

    const rows = this._readRows(mode);
    this._modes.changeConfig(mode);
    this._rows.set(rows);
  }

  public addListItem(row: CalculateSaved): void {
    const mode = this._modes.active();
    const rows = [...this._readRows(mode), row];

    this._storage.setItem(mode, JSON.stringify(rows));
    this._rows.set(rows);
  }

  public clearList(): void {
    this._storage.removeItem(this._modes.active());
    this._rows.set([]);
  }

  private _readRows(mode: AppConfig): CalculateSaved[] {
    const stored = this._storage.getItem(mode);

    if (!stored) {
      return [];
    }

    let rows: unknown;

    try {
      rows = JSON.parse(stored);
    } catch {
      return [];
    }

    if (!Array.isArray(rows)) {
      return [];
    }

    return rows.filter((row: unknown): row is CalculateSaved =>
      Array.isArray(row) &&
      row.length === 3 &&
      row.every((value: unknown) => typeof value === 'number' && Number.isFinite(value))
    );
  }
}
