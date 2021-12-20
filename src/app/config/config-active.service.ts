import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {shareReplay} from 'rxjs/operators';
import {AppConfig} from './config.service';

@Injectable()
export class ConfigActiveService {
  private _activeConfig: Subject<AppConfig> = new Subject<AppConfig>();

  public active$ = this._activeConfig.asObservable().pipe(
    shareReplay(1)
  );

  changeConfig(config: AppConfig): void {
    this._activeConfig.next(config);
  }
}
