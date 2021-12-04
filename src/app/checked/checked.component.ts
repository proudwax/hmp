import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from "rxjs";
import {finalize, map, tap} from 'rxjs/operators';
import {CONFIG_LIST, ConfigList} from '../config/config.token';
import {ConfigActiveService} from '../config/config-active.service';
import {Config} from '../config/config.service';
import {CHECKED_PLUGIN} from "./checked.token";
import {CheckedItem, CheckedLikePlugin} from "./checked.type";
import {AMOUNT_PROVIDER} from "./plugins/amount/amount.provider";
import {WEIGHT_PROVIDER} from "./plugins/weight/weight.provider";

@Component({
  selector: 'app-checked',
  templateUrl: './checked.component.html',
  styleUrls: ['./checked.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AMOUNT_PROVIDER,
    WEIGHT_PROVIDER
  ]
})
export class CheckedComponent {
  public readonly form: FormGroup = new FormGroup({
    value: new FormControl(''),
  });

  public readonly list$: Observable<CheckedItem[]>;

  constructor(
    @Inject(CONFIG_LIST) public readonly config$: ConfigList,
    @Inject(CHECKED_PLUGIN) public readonly pluginList: CheckedLikePlugin[],
    @Inject(ConfigActiveService) private _configActive: ConfigActiveService
  ) {
    this.list$ = this.config$.pipe(
      map((configList: Config[]) => this._createListCheckbox(configList, this.pluginList)),
      tap((checkedList: CheckedItem[]) => this.form.patchValue({value: checkedList[0].value})),
      finalize(() => console.log('CheckedComponent => finalize => list$'))
    );

    this.form.valueChanges.subscribe(({value}: { value: string }) => this._configActive.changeConfig(value));
  }

  public trackByItem(index: number, item: CheckedItem): string {
    return item.value;
  }

  private _createListCheckbox(
    configList: Config[],
    pluginList: CheckedLikePlugin[]): CheckedItem[] {
    return configList.reduce((acc: CheckedItem[], item: Config) => {
      const find = pluginList.find((plugin: CheckedLikePlugin) => plugin.support(item));

      if (find) {
        acc.push(find.getData());
      }

      return acc;
    }, []);
  }
}
