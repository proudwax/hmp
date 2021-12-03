import {ChangeDetectionStrategy, Component, EventEmitter, Inject, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {TuiPluralize} from '@taiga-ui/core';
import {debounceTime, map, switchMap, tap} from 'rxjs/operators';
import {CalculateService} from './calculate.service';
import {Observable} from 'rxjs';

interface FormCalculate {
  weight: number;
  cost: number;
  total: number;
}

@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: CalculateService, useClass: CalculateService }
  ]
})
export class CalculateComponent {
  private _result = 0;

  public config$: Observable<any>;
  public buttonDisabled: boolean = true;

  public readonly form: FormGroup = new FormGroup({
    cost: new FormControl(0),
    unit: new FormControl(0),
  });

  public readonly pluralize: TuiPluralize = ['гр.', 'гр.', 'гр.'];

  @Output() readonly changes = this._service.config$.pipe(
    tap(() => this.form.reset({ cost: 0, unit: 0 })),
    switchMap(config => this.form.valueChanges.pipe(
      tap(({cost, unit}) => (this.buttonDisabled && +cost && +unit) ? this.buttonDisabled = false : null),
      debounceTime(150),
      map(({ unit, cost }) => config.handler(cost, unit)),
    )),
    map(result => result.toFixed(2)),
    tap(result => this._result = result)
  );

  @Output() readonly saved: EventEmitter<FormCalculate> = new EventEmitter<FormCalculate>();

  constructor(
    @Inject(CalculateService) private _service: CalculateService,
  ) {
    this.config$ = this._service.config$;

    this.config$.subscribe(res => console.log(res));
  }

  onSave(event: MouseEvent): void {
    event.preventDefault();
    this.saved.emit({...this.form.value, total: this._result,});
    this.form.reset({unit: 0, cost: 0});
    this.buttonDisabled = true;
  }

  onClick(event: MouseEvent): void {
    event.preventDefault();
    this.form.reset({unit: 0, cost: 0});
    this.buttonDisabled = true;
  }

  onSubmit(event: any): void {
    console.log(event)
  }
}
