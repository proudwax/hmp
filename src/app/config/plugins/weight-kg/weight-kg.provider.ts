import {Provider} from "@angular/core";
import {WeightKGPlugin} from "./weight-kg.plugin";
import {CONFIG_PLUGIN} from "../../config.token";

export const WEIGHT_KG_PROVIDER: Provider = {
  provide: CONFIG_PLUGIN,
  useClass: WeightKGPlugin,
  multi: true
}
