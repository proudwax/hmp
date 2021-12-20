import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-cost',
  templateUrl: './cost.component.html',
  styleUrls: ['./cost.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CostComponent {
  @Input() data: number | null = 0;
}
