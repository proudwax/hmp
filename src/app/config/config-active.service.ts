import {computed, DOCUMENT, inject, Injectable, signal} from '@angular/core';
import type {CheckedItem} from '../checked/checked.type';
import {APP_STORAGE} from '../storage/storage.providers';
import {AppConfig} from './config.service';
import {CONFIG_LIST, CONFIG_PLUGIN, ConfigPlugin} from './config.token';

const ACTIVE_CONFIG_KEY = 'configActive';

@Injectable()
export class ConfigActiveService {
  private readonly _storage = inject(APP_STORAGE);
  private readonly _plugins = this._loadPlugins(inject(CONFIG_LIST), inject(CONFIG_PLUGIN));
  public readonly options: readonly CheckedItem[] = Array.from(
    this._plugins,
    ([value, plugin]) => ({ ...plugin.getChecked(), value })
  );

  private readonly _active = signal(this._resolveInitialMode(inject(DOCUMENT)));
  public readonly active = this._active.asReadonly();
  public readonly plugin = computed(() => {
    const plugin = this._plugins.get(this.active());

    if (!plugin) {
      throw new Error('The active mode has no configuration plugin.');
    }

    return plugin;
  });

  public hasMode(mode: string | null): mode is AppConfig {
    return mode !== null && this._plugins.has(mode);
  }

  public changeConfig(mode: AppConfig): void {
    if (!this.hasMode(mode) || this.active() === mode) {
      return;
    }

    this._storage.setItem(ACTIVE_CONFIG_KEY, mode);
    this._active.set(mode);
  }

  private _resolveInitialMode(document: Document): AppConfig {
    const requested = new URLSearchParams(document.location?.search).get('mode');
    const stored = this._storage.getItem(ACTIVE_CONFIG_KEY);
    const mode = [requested, stored].find(
      (candidate): candidate is AppConfig => this.hasMode(candidate)
    ) ?? this.options[0]?.value;

    if (mode === undefined) {
      throw new Error('No supported calculation mode is configured.');
    }

    if (mode !== stored) {
      this._storage.setItem(ACTIVE_CONFIG_KEY, mode);
    }

    return mode;
  }

  private _loadPlugins(
    config: readonly AppConfig[],
    plugins: readonly ConfigPlugin[]
  ): ReadonlyMap<AppConfig, ConfigPlugin> {
    const available = new Map<AppConfig, ConfigPlugin>();

    for (const mode of config) {
      const plugin = plugins.find(candidate => candidate.support(mode));

      if (plugin) {
        available.set(mode, plugin);
      }
    }

    return available;
  }
}
