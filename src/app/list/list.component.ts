import {ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {ListService} from './list.service';
import {Observable} from "rxjs";

export interface DataList {
  columns: string[];
  titles: { [key: string]: string };
  list: DataListItem;
  units: { [key: string]: string };
}

export type DataListItem = DataItemAmount[] | DataItemWeight[];

export interface DataItemAmount extends DataItem {
  amount: number;
}

export interface DataItemWeight extends DataItem {
  weight: number;
}

export interface DataItem {
  cost: number;
  total: number;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [
    {
      provide: ListService
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
  @Input()
  public set data(value: DataList) {
    const totalArray = value.list.map(item => item.total);
    const min = Math.min(...totalArray);
    const max = Math.max(...totalArray);

    this.getColor = this._service.getColor([min, max]);

    this._data = value;
  }

  public get data(): DataList {
    return this._data;
  }

  private _data!: DataList;

  get title(): { [key: string]: string } {
    return this.data.titles;
  }

  get unit(): { [key: string]: string } {
    return this.data.units;
  }

  public getColor: (d: number) => string = (d) => 'best';

  @Output() cleared: EventEmitter<void> = new EventEmitter<void>();

  public readonly list$:Observable<any>;

  constructor(
    @Inject(ListService) private _service: ListService
  ) {
    this.list$ = this._service.list$;
  }

  public trackBy(index: number, item: any): number {
    return index
  }

  public onClear(event: MouseEvent): void {
    event.preventDefault();

    this.cleared.emit();
  }
}
