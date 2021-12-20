import {Inject, Injectable} from '@angular/core';
import {APP_STORAGE} from './storage/storage.providers';
import {AbstractStorage} from './storage/abstract-storage';
import {merge, Observable, ReplaySubject, Subject} from 'rxjs';
import {filter, map, mapTo, scan, shareReplay, skip, startWith, switchMap, tap} from 'rxjs/operators';
import {DataListItem} from './list/list.component';
import {CONFIG_ACTIVE} from './config/config-active.token';
import {AppConfig} from './config/config.service';


@Injectable()
export class AppService {
  private _listKey: string = 'list';
  private _currentList: DataListItem = [];
  private _list$: Subject<any> = new Subject<any>();
  public readonly list$: Observable<any>;

  constructor(
    @Inject(CONFIG_ACTIVE) private readonly _config$: Observable<AppConfig>,
    @Inject(APP_STORAGE) private readonly _storage: AbstractStorage
  ) {
    this.list$ = this._config$.pipe(
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

  // public getList(): Observable<number[][]> {
  //   return this._config$.pipe(
  //     map((config: AppConfig) => this._initList(config))
  //   );
  // }

  public addListItem(value: number[]): void {
    console.log('addListItem');
    // this._currentList = [...this._currentList, value];
    // this._storage.setItem(this._listKey, JSON.stringify(this._currentList));
    // this._list$.next({type: 'ADD', value});
    this._list$.next(value);
  }

  public updateList(value: any[]): void {
    this._list$.next({type: 'UPDATE', value});
  }

  public clearList(): void {
    // this._storage.removeItem(this._listKey);
    // this._currentList = [];
    // this._list$.next(this._currentList);
  }
}
