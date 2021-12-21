import {ChangeDetectionStrategy, Component, Inject, OnDestroy} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable, Subject} from "rxjs";
import {map, takeUntil, tap} from 'rxjs/operators';
import {CONFIG_LIST, CONFIG_PLUGIN, ConfigList} from '../config/config.token';
import {ConfigActiveService} from '../config/config-active.service';
import {AppConfig} from '../config/config.service';
import {CheckedItem, CheckedLikePlugin} from "./checked.type";
import {APP_STORAGE} from "../storage/storage.providers";
import {AbstractStorage} from "../storage/abstract-storage";

@Component({
  selector: 'app-checked',
  templateUrl: './checked.component.html',
  styleUrls: ['./checked.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class CheckedComponent implements OnDestroy {
  private readonly _destroyed$: Subject<void> = new Subject<void>();
  private readonly _storeKey = 'configActive';

  public readonly list$: Observable<CheckedItem[]>;
  public readonly form: FormGroup = new FormGroup({
    value: new FormControl(''),
  });

  constructor(
    @Inject(APP_STORAGE) private _storage: AbstractStorage,
    @Inject(CONFIG_LIST) public readonly config$: ConfigList,
    @Inject(CONFIG_PLUGIN) public readonly pluginList: CheckedLikePlugin[],
    @Inject(ConfigActiveService) private _configActive: ConfigActiveService
  ) {
    const active = this._storage.getItem(this._storeKey);

    this.list$ = this.config$.pipe(
      map((configList: AppConfig[]) => this._createListCheckbox(configList, this.pluginList)),
      tap((checkedList: CheckedItem[]) =>
        this.form.patchValue({value: this._getStartConfigActive(active, checkedList)}))
    );

    this.form.valueChanges.pipe(
      takeUntil(this._destroyed$)
    ).subscribe(({value}: { value: string }) => this._setConfigActive(value));
  }

  public trackByItem(index: number, item: CheckedItem): string {
    return item.value;
  }

  private _createListCheckbox(
    configList: AppConfig[],
    pluginList: CheckedLikePlugin[]): CheckedItem[] {
    return configList.reduce((acc: CheckedItem[], item: AppConfig) => {
      const find = pluginList.find((plugin: CheckedLikePlugin) => plugin.support(item));

      if (find) {
        acc.push(find.getChecked());
      }

      return acc;
    }, []);
  }

  private _setConfigActive(config: string): void {
    this._storage.setItem(this._storeKey, config);
    this._configActive.changeConfig(config);
  }

  private _getStartConfigActive(active: AppConfig | null, configList: CheckedItem[]): string {
    const list = configList.map(item => item.value);

    if (active && list.includes(active)) {
      return active;
    }

    return list[0];
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}
