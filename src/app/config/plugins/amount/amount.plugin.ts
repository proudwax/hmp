import {CheckedLikePlugin} from "../../../checked/checked.type";
import {CalculateLikePlugin} from "../../../calculate/calculate.type";

export class AmountPlugin implements CheckedLikePlugin, CalculateLikePlugin  {
  getChecked(): { value: string; text: string } {
    return {value: 'amount', text: 'за 1 шт.'}
  }

  getCalculate(): { unit: string[]; handler: (a: number, b: number) => number; } {
    return {
      handler: (a: number, b: number) => (a && b ? a / b : 0),
      unit: ['₽', 'шт.']
    }
  }

  support(configName: string): boolean {
    return 'amount' === configName;
  }
}
