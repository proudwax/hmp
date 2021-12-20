import { CheckedLikePlugin } from "src/app/checked/checked.type";
import {CalculateLikePlugin} from "../../../calculate/calculate.type";

export class WeightPlugin implements CheckedLikePlugin, CalculateLikePlugin {
  getChecked(): { value: string; text: string } {
    return {text: 'за 1000 гр', value: 'weight'};
  }

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
