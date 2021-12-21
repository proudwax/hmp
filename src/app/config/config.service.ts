import {Injectable} from '@angular/core';
import {Observable, timer} from 'rxjs';
import {mapTo} from 'rxjs/operators';

export interface AppList {
  columns: string[];
  titles: { [key: string]: string }[];
  units: { [key: string]: string }[];
}

export type AppConfig = string;


const CONFIG_LIST: AppConfig[] = [
  'weight-kg', 'amount'
]

@Injectable()
export class ConfigService {
  config$: Observable<AppConfig[]> = timer(500).pipe(
    mapTo(CONFIG_LIST)
  );
}
