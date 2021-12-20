import {CheckedLikePlugin} from "../../../checked/checked.type";
import {CalculateLikePlugin} from "../../../calculate/calculate.type";

export class WeightKGPlugin implements CheckedLikePlugin, CalculateLikePlugin {
  getChecked(): { value: string; text: string } {
    return {text: 'за 1 кг', value: 'weight-kg'};
  }

  getCalculate(): { unit: string[]; handler: (a: number, b: number) => number; } {
    return {
      unit: ['₽', 'кг'],
      handler: (a: number, b: number) => (a && b ? b * a : 0)
    };
  }

  support(configName: string): boolean {
    return 'weight-kg' === configName;
  }
}
