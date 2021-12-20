import {CalculateLikePlugin} from "../../calculate.type";

export class WeightKGPlugin implements CalculateLikePlugin {
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
