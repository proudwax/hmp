import {CheckedLikePlugin} from "../../checked.type";

export class AmountPlugin implements CheckedLikePlugin {
  getData(): { value: string; text: string } {
    return {value: 'amount', text: 'за 1 шт.'}
  }

  support(configName: string): boolean {
    return 'amount' === configName;
  }
}
