import {CheckedLikePlugin} from "../../checked.type";

export class WeightPlugin implements CheckedLikePlugin {
  getData(): { value: string; text: string } {
    return {text: 'за 1 кг', value: 'weight'};
  }

  support(configName: string): boolean {
    return 'weight' === configName;
  }

}
