import {ChangeDetectionStrategy, Component, Inject, Input, OnInit} from '@angular/core';
import {CONFIG_ACTIVE, ConfigActive} from '../config/config-active.token';

@Component({
  selector: 'app-cost',
  templateUrl: './cost.component.html',
  styleUrls: ['./cost.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CostComponent {

  @Input() data: string | null = null;

  constructor(
    @Inject(CONFIG_ACTIVE) public config$: ConfigActive
  ) { }
}
