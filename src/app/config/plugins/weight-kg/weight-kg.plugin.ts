import {CheckedLikePlugin} from "../../../checked/checked.type";
import {CalculateLikePlugin} from "../../../calculate/calculate.type";
import {ListLikePlugin} from "../../../list/list.type";

export class WeightKGPlugin implements CheckedLikePlugin, CalculateLikePlugin, ListLikePlugin {
  getChecked(): { value: string; text: string } {
    return {text: 'за 1 кг', value: 'weight-kg'};
  }

  getCalculate(): { unit: string[]; handler: (a: number, b: number) => number; } {
    return {
      unit: ['₽', 'кг'],
      handler: (a: number, b: number) => (a && b ? a / b : 0)
    };
  }

  getList(): { unit: string[]; title: string[] } {
    return {
      unit: ['₽', 'кг', '₽'],
      title: ['Цена', 'Вес', 'Итог']
    }
  }

  support(configName: string): boolean {
    return 'weight-kg' === configName;
  }
}
