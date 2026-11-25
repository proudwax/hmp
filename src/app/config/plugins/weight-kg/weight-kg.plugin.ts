import { CalculateLikePlugin } from '../../../calculate/calculate.type';
import { CheckedLikePlugin } from '../../../checked/checked.type';
import { ListLikePlugin } from '../../../list/list.type';
import { ICON_CURRENCY, ICON_WEIGHT } from '../../icons.constants';

export class WeightKGPlugin
  implements CheckedLikePlugin, CalculateLikePlugin, ListLikePlugin
{
  getChecked(): { value: string; text: string } {
    return { text: 'за 1 кг', value: 'weight-kg' };
  }

  getCalculate(): {
    unit: string[];
    handler: (a: number, b: number) => number;
  } {
    return {
      unit: [
        `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(ICON_CURRENCY)}`,
        `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(ICON_WEIGHT)}`,
      ],
      handler: (a: number, b: number) => (a && b ? a / b : 0),
    };
  }

  getList(): { unit: string[]; title: string[] } {
    return {
      unit: ['₽', 'кг', '₽'],
      title: ['Цена', 'Вес', 'Итог'],
    };
  }

  support(configName: string): boolean {
    return 'weight-kg' === configName;
  }
}
