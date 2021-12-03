import {Inject, Injectable} from '@angular/core';
import {APP_STORAGE} from './storage/storage.providers';
import {AbstractStorage} from './storage/abstract-storage';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {map, shareReplay, startWith} from 'rxjs/operators';
import {DataItemAmount, DataItemWeight, DataListItem} from './list/list.component';
import {CONFIG_ACTIVE, ConfigActive} from './config/config-active.token';
import {ConfigItem} from './config/config.service';



@Injectable()
export class AppService {
  private _listKey: string = 'list';
  private _currentList: DataListItem = [];
  private _list$: ReplaySubject<DataListItem> = new ReplaySubject<DataListItem>(1);

  constructor(
    @Inject(CONFIG_ACTIVE) private _config$: ConfigActive,
    @Inject(APP_STORAGE) private _storage: AbstractStorage
  ) {
  }

  private _initList(listName: string): DataItemAmount[] | DataItemWeight[] {
    const dataString = this._storage.getItem(listName);
    return dataString ? JSON.parse(dataString) : [];
  }

  public getList(): Observable<DataListItem> {
    return this._config$.pipe(
      map((config: ConfigItem) => this._initList(config.name))
    );
  }

  public addListItem(value: DataItemAmount | DataItemWeight): void {
    // this._currentList = [...this._currentList, value];
    // this._storage.setItem(this._listKey, JSON.stringify(this._currentList));
    // this._list$.next(this._currentList);
  }

  public clearList(): void {
    // this._storage.removeItem(this._listKey);
    // this._currentList = [];
    // this._list$.next(this._currentList);
  }
}
