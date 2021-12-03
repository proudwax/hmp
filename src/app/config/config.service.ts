import {Injectable} from '@angular/core';
import {Observable, timer} from 'rxjs';
import {map} from 'rxjs/operators';

export interface AppList {
  columns: string[];
  titles: { [key: string]: string }[];
  units: { [key: string]: string }[];
}

export interface AppChecked {
  text: string;
  value: string;
}

export type ConfigItem = {
  name: string;
  checked: AppChecked;
  list: AppList;
  calculate: any;
};

const CONFIG_LIST: ConfigItem[] = [
  {
    name: 'weight',
    checked: {
      text: 'за 1 кг',
      value: 'weight'
    },
    calculate: {
      fields: {
        cost: {
          text: "₽",
        },
        unit: {
          min: 2,
          max: 2000,
          pluralize: ['гр.', 'гр.', 'гр.'],
        }
      },
      handler: (cost: number, unit: number) => (unit && cost ? 1000 / unit * cost : 0)
    },
    list: {
      columns: ['weight', 'cost', 'total'],
      titles: [{unit: 'Вес'}, {cost: 'Цена'}, {total: 'Цена за 1 кг'}],
      units: [{unit: 'гр.'}, {cost: '₽'}, {total: '₽'}],
    },
  },
  {
    name: 'amount',
    checked: {
      text: 'за 1 шт.',
      value: 'amount'
    },
    calculate: {
      fields: {
        cost: {
          text: "₽",
        },
        unit: {
          min: 1,
          max: 30,
          pluralize: ['шт.', 'шт.', 'шт.']
        }
      },
      handler: (cost: number, unit: number) => (cost && unit ? cost / unit : 0)
    },
    list: {
      columns: ['amount', 'cost', 'total'],
      titles: [{amount: 'Количество'}, {cost: 'Цена'}, {total: 'Цена за 1 шт.'}],
      units: [{amount: 'шт.'}, {cost: '₽'}, {total: '₽'}],
    },
  }
]

@Injectable()
export class ConfigService {
  config$: Observable<ConfigItem[]> = timer(1500).pipe(
    map(_ => CONFIG_LIST)
  );
}
