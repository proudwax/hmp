import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {AppService} from './app.service';
import {Observable} from 'rxjs';
// TODO: (Taiga UI migration) tuiFadeIn has been removed. Angular animations are replaced with CSS animations + TuiAnimated directive from @taiga-ui/cdk. See https://taiga-ui.dev/directives/animated
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
    animations: [tuiFadeIn],
    standalone: false
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
