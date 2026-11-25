import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  linkedSignal,
  output,
  untracked,
} from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { TuiButton, TuiGroup, TuiTextfield } from '@taiga-ui/core';
import { TuiInputNumber } from '@taiga-ui/kit';
import { ConfigActiveService } from '../config/config-active.service';
import type { CalculateItem, CalculateSaved } from './calculate.type';

@Component({
  selector: 'app-calculate',
  exportAs: 'appCalculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.scss'],
  imports: [FormField, TuiGroup, TuiTextfield, TuiInputNumber, TuiButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class CalculateComponent {
  private readonly _modes = inject(ConfigActiveService);

  public readonly settings = computed<CalculateItem>(() =>
    this._modes.plugin().getCalculate(),
  );
  private readonly _draft = linkedSignal({
    source: this._modes.active,
    computation: () => this._createDraft(),
  });
  private readonly _values = computed(() =>
    this._draft().values.map((value) => value ?? 0),
  );

  public readonly fields = form(this._draft);
  public readonly inputs = computed(() => {
    const mode = this._modes.active();
    const units = this.settings().unit;

    return Array.from(this.fields.values, (field, index) => ({
      field,
      unit: units[index],
      // Taiga's input mask needs a new element when the unit changes.
      key: `${mode}:${index}`,
    }));
  });

  public readonly total = computed(() => {
    const result = this.settings().handler(...this._values());
    return Number(result.toFixed(2));
  });
  public readonly buttonDisabled = computed(() => {
    const total = this.total();
    return total === 0 || !Number.isFinite(total);
  });
  public readonly saved = output<CalculateSaved>();

  constructor() {
    let previousMode = this._modes.active();

    effect(() => {
      const mode = this._modes.active();

      if (mode !== previousMode) {
        previousMode = mode;
        untracked(() => this.fields().reset());
      }
    });
  }

  public onSave(event: Event): void {
    event.preventDefault();

    if (!this.buttonDisabled()) {
      this.saved.emit([...this._values(), this.total()]);
    }
  }

  public reset(): void {
    this.fields().reset(this._createDraft());
  }

  private _createDraft(): { values: (number | null)[] } {
    return { values: this.settings().unit.map(() => null) };
  }
}
