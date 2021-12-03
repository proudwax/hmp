import {Provider} from "@angular/core";
import {ConfigActiveService} from "./config-active.service";
import {ConfigService} from "./config.service";

export const CONFIG_PROVIDER: Provider[] = [
  ConfigService,
  ConfigActiveService,
];
