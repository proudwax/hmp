import {ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {CONFIG_PLUGIN} from "../config/config.token";
import {CONFIG_ACTIVE, ConfigActive} from "../config/config-active.token";
import {tuiFadeIn, tuiFadeInBottom, tuiHeightCollapse} from "@taiga-ui/core";
import {AppConfig} from "../config/config.service";
import {map} from "rxjs/operators";
import {ListLikePlugin} from "./list.type";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [tuiFadeIn, tuiFadeInBottom, tuiHeightCollapse]
})
export class ListComponent {
  @Input()
  public set data(value: number[][]) {
    this.min = Math.min(...value.map(item => item[2]));

    this._data = value;
  }

  public get data(): number[][] {
    return this._data;
  }

  private _data: number[][] = [];

  public min: number = 0;
  public title: string[] = [];
  public units: string[] = [];
  public config: AppConfig | null = null;

  @Output() cleared: EventEmitter<AppConfig> = new EventEmitter<AppConfig>();

  constructor(
    @Inject(CONFIG_ACTIVE) private readonly _activeConfig$: ConfigActive,
    @Inject(CONFIG_PLUGIN) private readonly _pluginList: ListLikePlugin[],
  ) {
    this._activeConfig$.pipe(
      map((config: AppConfig) => {
        const find = this._pluginList.find(plugin => plugin.support(config));

        return {...find!.getList(), config};
      })
    ).subscribe(({title, unit, config}) => {
      this.title = title;
      this.units = unit;
      this.config = config;
    });
  }

  public trackBy(index: number): number {
    return index
  }

  public onClear(event: MouseEvent): void {
    event.preventDefault();

    this.cleared.emit(this.config as AppConfig);
  }
}
