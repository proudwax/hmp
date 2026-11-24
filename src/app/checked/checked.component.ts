import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  linkedSignal,
  output,
} from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { TuiGroup, TuiRadio } from '@taiga-ui/core';
import { TuiBlock } from '@taiga-ui/kit';
import { ConfigActiveService } from '../config/config-active.service';
import { CONFIG_ACTIVE } from '../config/config-active.token';
import type { AppConfig } from '../config/config.service';

@Component({
  selector: 'app-checked',
  templateUrl: './checked.component.html',
  styleUrls: ['./checked.component.scss'],
  imports: [FormField, TuiGroup, TuiBlock, TuiRadio],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class CheckedComponent {
  private readonly _active = inject(CONFIG_ACTIVE);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _selection = linkedSignal(
    () => ({ value: this._active() }),
    { set: ({ value }) => this._selectMode(value) },
  );

  public readonly options = inject(ConfigActiveService).options;
  public readonly modeSelected = output<AppConfig>();
  public readonly form = form(this._selection);

  private _selectMode(mode: AppConfig): void {
    this.modeSelected.emit(mode);

    if (mode !== this._active()) {
      // Restore the checked radio after native input handling finishes.
      queueMicrotask(() => {
        if (!this._destroyRef.destroyed) {
          this.form().reset();
        }
      });
    }
  }
}
