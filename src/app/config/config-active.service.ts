import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {shareReplay} from 'rxjs/operators';
import {ConfigItem} from './config.service';

@Injectable()
export class ConfigActiveService {
  private _activeConfig: Subject<ConfigItem> = new Subject<ConfigItem>();

  public active$ = this._activeConfig.asObservable().pipe(
    shareReplay(1)
  );

  changeConfig(config: ConfigItem): void {
    this._activeConfig.next(config);
  }
}
