import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CONFIG_LIST, ConfigList} from '../config/config.token';
import {ConfigActiveService} from '../config/config-active.service';
import {map, startWith, switchMap, tap} from 'rxjs/operators';
import {ConfigItem} from '../config/config.service';

@Component({
  selector: 'app-checked',
  templateUrl: './checked.component.html',
  styleUrls: ['./checked.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckedComponent {
  readonly form: FormGroup = new FormGroup({
    value: new FormControl(''),
  });

  constructor(
    @Inject(CONFIG_LIST) public readonly config$: ConfigList,
    @Inject(ConfigActiveService) private _configActive: ConfigActiveService
  ) {
    this.config$.pipe(
      tap((configList: ConfigItem[]) => this.form.patchValue({value: configList[0].name})),
      switchMap((configList: ConfigItem[]) => this.form.valueChanges.pipe(
        startWith({value: configList[0].name}),
        map(({value}) => configList.find((item: ConfigItem) => item.name === value))
      )),
    ).subscribe((config: ConfigItem | void) => {
      if (config) {
        this._configActive.changeConfig(config);
      }
    });
  }

  public trackByIndex(index: number, item: ConfigItem): number {
    return index;
  }
}
