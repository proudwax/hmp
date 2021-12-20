import {Provider} from "@angular/core";
import {WeightPlugin} from "./weight.plugin";
import {CALCULATE_PLUGIN} from "../../calculate.token";

export const WEIGHT_PROVIDER: Provider = {
  provide: CALCULATE_PLUGIN,
  useClass: WeightPlugin,
  multi: true
}
