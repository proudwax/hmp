import {Provider} from "@angular/core";
import {WeightKGPlugin} from "./weight.plugin";
import {CALCULATE_PLUGIN} from "../../calculate.token";

export const WEIGHT_KG_PROVIDER: Provider = {
  provide: CALCULATE_PLUGIN,
  useClass: WeightKGPlugin,
  multi: true
}
