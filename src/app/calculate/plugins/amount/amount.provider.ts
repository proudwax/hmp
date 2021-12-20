import {Provider} from "@angular/core";
import {AmountPlugin} from "./amount.plugin";
import {CALCULATE_PLUGIN} from "../../calculate.token";

export const AMOUNT_PROVIDER: Provider = {
  provide: CALCULATE_PLUGIN,
  useClass: AmountPlugin,
  multi: true
}
