import {inject, InjectionToken} from '@angular/core';
import {ConfigItem, ConfigService} from './config.service';
import {Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';

export type ConfigList = Observable<ConfigItem[]>;

export const CONFIG_LIST = new InjectionToken<ConfigList>('Config', {
  factory() {
    return inject(ConfigService).config$.pipe(
      shareReplay({ refCount: true, bufferSize: 1 }),
    );
  }
});
