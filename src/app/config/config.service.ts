import {Injectable} from '@angular/core';

export interface AppList {
  columns: string[];
  titles: { [key: string]: string }[];
  units: { [key: string]: string }[];
}

export type AppConfig = string;


@Injectable()
export class ConfigService {
  readonly config: readonly AppConfig[] = ['weight-kg', 'amount'];
}
