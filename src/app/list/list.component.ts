import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiButton, TuiNumberFormatSettings } from '@taiga-ui/core';
import { TuiFormatNumberPipe } from '@taiga-ui/kit';
import { TuiCardLarge } from '@taiga-ui/layout';
import { ConfigActiveService } from '../config/config-active.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  imports: [TuiFormatNumberPipe, TuiButton, TuiTable, TuiCardLarge],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ListComponent {
  private readonly _modes = inject(ConfigActiveService);

  public readonly data = input.required<readonly number[][]>();
  public readonly columns = computed(() => this._modes.plugin().getList());
  public readonly cleared = output<void>();
  public readonly numberFormat: Partial<TuiNumberFormatSettings> = {
    precision: Infinity,
    decimalSeparator: ',',
  };
}
