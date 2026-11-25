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
  public readonly highlightedRows = computed(() => {
    const rows = this.data();
    const costColumn = 2;
    let lowest = 0;
    let highest = 0;

    for (let index = 1; index < rows.length; index++) {
      const cost = rows[index][costColumn];

      if (cost < rows[lowest][costColumn]) {
        lowest = index;
      }

      if (cost > rows[highest][costColumn]) {
        highest = index;
      }
    }

    return {
      lowest: rows.length > 1 ? lowest : null,
      highest: rows.length > 3 && lowest !== highest ? highest : null,
    };
  });
  public readonly cleared = output<void>();
  public readonly numberFormat: Partial<TuiNumberFormatSettings> = {
    precision: Infinity,
    decimalSeparator: ',',
  };
}
