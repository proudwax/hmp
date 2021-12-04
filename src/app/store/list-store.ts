import {Inject, Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {DataItemAmount, DataItemWeight} from '../list/list.component';
import {Observable} from 'rxjs';
import {CONFIG_ACTIVE, ConfigActive} from '../config/config-active.token';
import {APP_STORAGE} from '../storage/storage.providers';
import {AbstractStorage} from '../storage/abstract-storage';
import {switchMap} from 'rxjs/operators';
import {Config} from '../config/config.service';

export interface ListState {
  list: DataItemAmount[] | DataItemWeight[]
}

@Injectable()
export class ListStore extends ComponentStore<ListState> {
  readonly list$: Observable<DataItemAmount[] | DataItemWeight[]> = this.select(state => state.list);

  constructor(
    @Inject(CONFIG_ACTIVE) private _config$: ConfigActive,
    @Inject(APP_STORAGE) private _storage: AbstractStorage
  ) {
    super({ list: [] });
  }

  public getList(listName: string) {

    // return this._config$.pipe(
    //   switchMap((config: ConfigItem) => this._storage.getItem(config.name))
    // )
  }
}
