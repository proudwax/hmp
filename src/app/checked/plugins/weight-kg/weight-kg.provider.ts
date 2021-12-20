import {Provider} from "@angular/core";
import {CHECKED_PLUGIN} from "../../checked.token";
import {WeightKGPlugin} from "./weight-kg.plugin";

export const WEIGHT_KG_PROVIDER: Provider = {
  provide: CHECKED_PLUGIN,
  useClass: WeightKGPlugin,
  multi: true
}
