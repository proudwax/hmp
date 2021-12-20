import {CheckedLikePlugin} from "../../checked.type";

export class WeightKGPlugin implements CheckedLikePlugin {
  getChecked(): { value: string; text: string } {
    return {text: 'за 1 кг', value: 'weight-kg'};
  }

  support(configName: string): boolean {
    return 'weight-kg' === configName;
  }
}
