import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CONFIG_ACTIVE, ConfigActive} from '../config/config-active.token';
import {map, shareReplay} from 'rxjs/operators';

@Injectable()
export class CalculateService {
  public config$: Observable<any>;

  constructor(
    @Inject(CONFIG_ACTIVE) private _config$: ConfigActive
  ) {
    this.config$ = this._config$.pipe(
      map(config => config),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }
}
