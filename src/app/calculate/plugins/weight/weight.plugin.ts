import {CalculateLikePlugin} from "../../calculate.type";

export class WeightPlugin implements CalculateLikePlugin {
  getCalculate(): { unit: string[]; handler: (a: number, b: number) => number; } {
    return {
      unit: ['₽', 'гр'],
      handler: (a: number, b: number) => (a && b ? 1000 / b * a : 0)
    };
  }

  support(configName: string): boolean {
    return 'weight' === configName;
  }

}
