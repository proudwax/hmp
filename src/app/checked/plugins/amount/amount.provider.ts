import {Provider} from "@angular/core";
import {CHECKED_PLUGIN} from "../../checked.token";
import {AmountPlugin} from "./amount.plugin";

export const AMOUNT_PROVIDER: Provider = {
  provide: CHECKED_PLUGIN,
  useClass: AmountPlugin,
  multi: true
}
