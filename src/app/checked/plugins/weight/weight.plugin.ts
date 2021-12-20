import {CheckedLikePlugin} from "../../checked.type";

export class WeightPlugin implements CheckedLikePlugin {
  getChecked(): { value: string; text: string } {
    return {text: 'за 1000 гр', value: 'weight'};
  }

  support(configName: string): boolean {
    return 'weight' === configName;
  }

}
