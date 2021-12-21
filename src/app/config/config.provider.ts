import {Provider} from "@angular/core";
import {ConfigActiveService} from "./config-active.service";
import {ConfigService} from "./config.service";
import {AMOUNT_PROVIDER} from "./plugins/amount/amount.provider";
import {WEIGHT_KG_PROVIDER} from "./plugins/weight-kg/weight-kg.provider";

export const CONFIG_PROVIDER: Provider[] = [
  ConfigService,
  ConfigActiveService,
  AMOUNT_PROVIDER,
  WEIGHT_KG_PROVIDER
];
