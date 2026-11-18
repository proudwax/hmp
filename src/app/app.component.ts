import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { AppConfig } from './config/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: AppService,
      useClass: AppService,
    },
  ],
  standalone: false,
})
export class AppComponent {
  public data$: Observable<number[][]>;

  constructor(@Inject(AppService) private _appService: AppService) {
    this.data$ = this._appService.list$;
  }

  public onSaved(data: number[]): void {
    this._appService.addListItem(data);
  }

  public onCleared(config: AppConfig): void {
    this._appService.clearList(config);
  }

  public onChecked($event: { value: string }): void {}
}
