import {Provider} from "@angular/core";
import {AmountPlugin} from "./amount.plugin";
import {CONFIG_PLUGIN} from "../../config.token";

export const AMOUNT_PROVIDER: Provider = {
  provide: CONFIG_PLUGIN,
  useClass: AmountPlugin,
  multi: true
}
