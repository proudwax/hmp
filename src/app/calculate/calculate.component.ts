import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  Output
} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl} from '@angular/forms';
import {distinctUntilChanged, map, shareReplay, switchMap, takeUntil, tap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {CONFIG_ACTIVE, ConfigActive} from "../config/config-active.token";
import {CalculateItem, CalculateLikePlugin, CalculateSaved} from "./calculate.type";
import {AppConfig} from "../config/config.service";
import {CalculateForm} from "./calculate.form";
import {CONFIG_PLUGIN} from "../config/config.token";

@Component({
  selector: 'app-calculate',
  exportAs: 'appCalculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculateComponent implements OnDestroy {
  private _destroyed$: Subject<void> = new Subject<void>();

  public readonly list$: Observable<CalculateItem>;
  public form!: CalculateForm;
  public buttonDisabled: boolean = true;


  public get calculate(): FormArray {
    return this.form.get('calculate') as FormArray;
  }

  public get total(): FormControl {
    return this.form.get('total') as FormControl
  }

  @Output() readonly changes: EventEmitter<number> = new EventEmitter<number>();
  @Output() readonly saved: EventEmitter<CalculateSaved> = new EventEmitter<CalculateSaved>();

  constructor(
    @Inject(CONFIG_ACTIVE) private readonly _activeConfig$: ConfigActive,
    @Inject(CONFIG_PLUGIN) private readonly pluginList: CalculateLikePlugin[],
    @Inject(FormBuilder) private readonly _fb: FormBuilder,
    @Inject(ChangeDetectorRef) private readonly _cdr: ChangeDetectorRef
  ) {
    this.form = new CalculateForm({
      calculate: this._fb.array([]),
      total: this._fb.control(0)
    });

    this.list$ = this._activeConfig$.pipe(
      map((config: AppConfig) => {
        const find = this.pluginList!.find((plugin: CalculateLikePlugin) => plugin.support(config));

        return find!.getCalculate();
      }),
      tap(({unit}) => this._createForm(unit.length)),
      shareReplay({refCount: true, bufferSize: 1})
    );

    this.list$.pipe(
      switchMap(({handler}: CalculateItem) => this.calculate.valueChanges.pipe(
        map((value: number[]) => handler(...value))
      )),
      distinctUntilChanged()
    ).subscribe((total: number) => {
      const result = parseFloat(total.toFixed(2));
      this.total.patchValue(result);
    });

    this.total.valueChanges.pipe(
      takeUntil(this._destroyed$),
      tap((value: number) => this.buttonDisabled = !value)
    ).subscribe((value: number) => this.changes.emit(value));
  }

  onSave(event: MouseEvent): void {
    event.preventDefault();
    this.saved.emit([...this.calculate.value, this.total.value]);
    this._resetForm();
    this.buttonDisabled = true;
  }

  onReset(event: MouseEvent): void {
    event.preventDefault();
    this._resetForm();
    this.buttonDisabled = true;
  }

  onSubmit(event: any): void {
    console.log(event)
  }

  private _resetForm(): void {
    this.calculate.reset([0, 0]);
  }

  private _createForm(length: number): void {
    this.calculate.clear();

    for (let i = 0; i < length; i++) {
      (this.form.get('calculate')! as FormArray).push(this._fb.control(0))
    }
  }

  public trackByIndex(index: number, item: AbstractControl): AbstractControl {
    return item;
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}
