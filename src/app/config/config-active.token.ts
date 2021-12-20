import {inject, InjectionToken} from '@angular/core';
import {ConfigActiveService} from './config-active.service';
import {Observable} from 'rxjs';
import {AppConfig} from './config.service';

export type ConfigActive = Observable<AppConfig>;

export const CONFIG_ACTIVE = new InjectionToken<ConfigActive>('Active config', {
  factory: () => inject(ConfigActiveService).active$
});
