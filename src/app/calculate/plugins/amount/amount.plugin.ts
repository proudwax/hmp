import {CalculateLikePlugin} from "../../calculate.type";

export class AmountPlugin implements CalculateLikePlugin {
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
