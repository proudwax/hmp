import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {shareReplay} from 'rxjs/operators';
import {Config} from './config.service';

@Injectable()
export class ConfigActiveService {
  private _activeConfig: Subject<Config> = new Subject<Config>();

  public active$ = this._activeConfig.asObservable().pipe(
    shareReplay(1)
  );

  changeConfig(config: Config): void {
    this._activeConfig.next(config);
  }
}
