import {Inject, Injectable} from '@angular/core';
import {AppService} from "../app.service";
import {Observable} from "rxjs";

@Injectable()
export class ListService {
  private _colorMap = ['best', 'worst']

  public getColor([min]: [number, number]) {
    return (d: number): string => this._colorMap[+(+d !== min)];
  }

  public readonly list$: Observable<any>;

  constructor(
    @Inject(AppService) private readonly _appService: AppService
  ) {
    this.list$ = this._appService.list$;
  }
}
