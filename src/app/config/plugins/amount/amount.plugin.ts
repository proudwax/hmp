import { CalculateLikePlugin } from '../../../calculate/calculate.type';
import { CheckedLikePlugin } from '../../../checked/checked.type';
import { ListLikePlugin } from '../../../list/list.type';
import { ICON_AMOUNT, ICON_CURRENCY } from '../../icons.constants';

export class AmountPlugin
  implements CheckedLikePlugin, CalculateLikePlugin, ListLikePlugin
{
  getChecked(): { value: string; text: string } {
    return { value: 'amount', text: 'за 1 шт.' };
  }

  getCalculate(): {
    unit: string[];
    handler: (a: number, b: number) => number;
  } {
    return {
      handler: (a: number, b: number) => (a && b ? a / b : 0),
      unit: [
        `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(ICON_CURRENCY)}`,
        `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(ICON_AMOUNT)}`,
      ],
    };
  }

  getList(): { unit: string[]; title: string[] } {
    return {
      unit: ['₽', 'шт.', '₽'],
      title: ['Цена', 'Количество', 'Итог'],
    };
  }

  support(configName: string): boolean {
    return 'amount' === configName;
  }
}
