import {Inject, Injectable} from '@angular/core';
import {APP_STORAGE} from './storage/storage.providers';
import {AbstractStorage} from './storage/abstract-storage';
import {merge, Observable, Subject} from 'rxjs';
import {scan, shareReplay, startWith, switchMap, tap} from 'rxjs/operators';
import {CONFIG_ACTIVE} from './config/config-active.token';
import {AppConfig} from './config/config.service';


@Injectable()
export class AppService {
  private readonly _list$: Subject<any> = new Subject<any>();
  private readonly _reset$: Subject<AppConfig> = new Subject<AppConfig>();
  public readonly list$: Observable<number[][]>;

  constructor(
    @Inject(CONFIG_ACTIVE) private readonly _config$: Observable<AppConfig>,
    @Inject(APP_STORAGE) private readonly _storage: AbstractStorage
  ) {
    this.list$ = merge(this._config$, this._reset$.asObservable()).pipe(
      switchMap(config => this._list$.asObservable().pipe(
        startWith(this._initList(config)),
        scan((a, b) => [...a, b]),
        tap(value => this._storage.setItem(config, JSON.stringify(value)))
      )),
      shareReplay({refCount: true, bufferSize: 1})
    );
  }

  private _initList(config: AppConfig): number[][] {
    const dataString = this._storage.getItem(config);
    return dataString ? JSON.parse(dataString) : [];
  }

  public addListItem(value: number[]): void {
    this._list$.next(value);
  }

  public updateList(value: any[]): void {
    this._list$.next({type: 'UPDATE', value});
  }

  public clearList(config: AppConfig): void {
    this._storage.removeItem(config);
    this._reset$.next(config);
  }
}
