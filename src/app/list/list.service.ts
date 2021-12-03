import {Injectable} from '@angular/core';

@Injectable()
export class ListService {
  private _colorMap = ['best', 'worst']

  public getColor([min]: [number, number]) {
    return (d: number): string =>  this._colorMap[+(+d !== min)];
  }
}
