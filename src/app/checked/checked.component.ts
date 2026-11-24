import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  Inject,
  OnDestroy,
} from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { TuiGroup, TuiRadio } from '@taiga-ui/core';
import { TuiBlock } from '@taiga-ui/kit';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { ConfigActiveService } from '../config/config-active.service';
import { AppConfig } from '../config/config.service';
import { CONFIG_LIST, CONFIG_PLUGIN, ConfigList } from '../config/config.token';
import { AbstractStorage } from '../storage/abstract-storage';
import { APP_STORAGE } from '../storage/storage.providers';
import { CheckedItem, CheckedLikePlugin } from './checked.type';

@Component({
  selector: 'app-checked',
  templateUrl: './checked.component.html',
  styleUrls: ['./checked.component.scss'],
  imports: [AsyncPipe, ReactiveFormsModule, TuiGroup, TuiBlock, TuiRadio],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class CheckedComponent implements OnDestroy {
  private readonly _destroyed$: Subject<void> = new Subject<void>();
  private readonly _storeKey = 'configActive';

  public readonly list$: Observable<CheckedItem[]>;
  public readonly form: UntypedFormGroup = new UntypedFormGroup({
    value: new UntypedFormControl(''),
  });

  constructor(
    @Inject(APP_STORAGE) private _storage: AbstractStorage,
    @Inject(CONFIG_LIST) public readonly config$: ConfigList,
    @Inject(CONFIG_PLUGIN) public readonly pluginList: CheckedLikePlugin[],
    @Inject(ConfigActiveService) private _configActive: ConfigActiveService,
    @Inject(DOCUMENT) document: Document,
  ) {
    const active = this._storage.getItem(this._storeKey);
    const requested = new URLSearchParams(document.location?.search).get('mode');

    this.list$ = this.config$.pipe(
      map((configList: AppConfig[]) =>
        this._createListCheckbox(configList, this.pluginList),
      ),
      tap((checkedList: CheckedItem[]) =>
        this.form.patchValue({
          value: this._getStartConfigActive(requested, active, checkedList),
        }),
      ),
    );

    this.form.valueChanges
      .pipe(takeUntil(this._destroyed$))
      .subscribe(({ value }: { value: string }) =>
        this._setConfigActive(value),
      );
  }

  public trackByItem(index: number, item: CheckedItem): string {
    return item.value;
  }

  private _createListCheckbox(
    configList: AppConfig[],
    pluginList: CheckedLikePlugin[],
  ): CheckedItem[] {
    return configList.reduce((acc: CheckedItem[], item: AppConfig) => {
      const find = pluginList.find((plugin: CheckedLikePlugin) =>
        plugin.support(item),
      );

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

  private _getStartConfigActive(
    requested: string | null,
    active: AppConfig | null,
    configList: CheckedItem[],
  ): string {
    const list = configList.map((item) => item.value);

    if (requested && list.includes(requested)) {
      return requested;
    }

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
