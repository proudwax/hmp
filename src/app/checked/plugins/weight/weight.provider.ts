import {Provider} from "@angular/core";
import {CHECKED_PLUGIN} from "../../checked.token";
import {WeightPlugin} from "./weight.plugin";

export const WEIGHT_PROVIDER: Provider = {
  provide: CHECKED_PLUGIN,
  useClass: WeightPlugin,
  multi: true
}
