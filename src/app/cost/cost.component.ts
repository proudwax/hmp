import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TuiFormatNumberPipe } from '@taiga-ui/kit';

@Component({
  selector: 'app-cost',
  templateUrl: './cost.component.html',
  styleUrls: ['./cost.component.scss'],
  imports: [TuiFormatNumberPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class CostComponent {
  @Input() data: number | null = 0;
}
