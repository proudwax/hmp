import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {AppService} from './app.service';
import {Observable} from 'rxjs';
import {DataItemAmount, DataItemWeight} from './list/list.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: AppService, useClass: AppService
    }
  ]
})
export class AppComponent {
  public cost: string = '0.00';
  public data$: Observable<DataItemAmount[] | DataItemWeight[]>;

  constructor(
    @Inject(AppService) private _appService: AppService
  ) {
    this.data$ = this._appService.getList();
  }

  public onSaved(data: DataItemAmount | DataItemWeight): void {
    this._appService.addListItem(data);
  }

  public onCleared(): void {
    this._appService.clearList();
  }

  public onChecked($event: { value: string }): void {

  }
}
