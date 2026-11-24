import {inject, InjectionToken} from '@angular/core';
import type {CalculateLikePlugin} from '../calculate/calculate.type';
import type {CheckedLikePlugin} from '../checked/checked.type';
import type {ListLikePlugin} from '../list/list.type';
import {AppConfig, ConfigService} from './config.service';

export type ConfigList = readonly AppConfig[];
export type ConfigPlugin = CalculateLikePlugin & CheckedLikePlugin & ListLikePlugin;

export const CONFIG_LIST = new InjectionToken<ConfigList>('Config', {
  factory: () => inject(ConfigService).config
});

export const CONFIG_PLUGIN = new InjectionToken<readonly ConfigPlugin[]>('config plugin');
