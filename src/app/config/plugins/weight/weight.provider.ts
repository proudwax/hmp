import {Provider} from "@angular/core";
import {WeightPlugin} from "./weight.plugin";
import {CONFIG_PLUGIN} from "../../config.token";

export const WEIGHT_PROVIDER: Provider = {
  provide: CONFIG_PLUGIN,
  useClass: WeightPlugin,
  multi: true
}
