import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {AppService} from './app.service';
import {Observable} from 'rxjs';
import {tuiFadeIn} from "@taiga-ui/core";
import {AppConfig} from "./config/config.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: AppService, useClass: AppService
    }
  ],
  animations: [tuiFadeIn]
})
export class AppComponent {
  public data$: Observable<number[][]>;

  constructor(
    @Inject(AppService) private _appService: AppService
  ) {
    this.data$ = this._appService.list$;
  }

  public onSaved(data: number[]): void {
    this._appService.addListItem(data);
  }

  public onCleared(config: AppConfig): void {
    this._appService.clearList(config);
  }

  public onChecked($event: { value: string }): void {

  }
}
