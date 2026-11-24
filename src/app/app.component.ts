import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AppService } from './app.service';
import { CalculateComponent } from './calculate/calculate.component';
import type { CalculateSaved } from './calculate/calculate.type';

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
  public readonly history = inject(AppService);

  public onSaved(row: CalculateSaved, calculator: CalculateComponent): void {
    this.history.addListItem(row);
    calculator.reset();
  }
}
