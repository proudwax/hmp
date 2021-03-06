import {inject, InjectionToken} from '@angular/core';
import {AppConfig, ConfigService} from './config.service';
import {Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';

export type ConfigList = Observable<AppConfig[]>;

export const CONFIG_LIST = new InjectionToken<ConfigList>('Config', {
  factory() {
    return inject(ConfigService).config$.pipe(
      shareReplay({refCount: true, bufferSize: 1}),
    );
  }
});


export const CONFIG_PLUGIN = new InjectionToken<{ support(name: string): boolean }>('config plugin');
