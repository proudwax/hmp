import {inject, InjectionToken, Signal} from '@angular/core';
import {ConfigActiveService} from './config-active.service';
import {AppConfig} from './config.service';

export type ConfigActive = Signal<AppConfig>;

export const CONFIG_ACTIVE = new InjectionToken<ConfigActive>('Active config', {
  factory: () => inject(ConfigActiveService).active
});
