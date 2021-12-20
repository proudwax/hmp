import {AbstractControl, AbstractControlOptions, AsyncValidatorFn, FormGroup, ValidatorFn} from "@angular/forms";

export class CalculateForm extends FormGroup {
  constructor(
    controls: { [p: string]: AbstractControl },
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(controls, validatorOrOpts, asyncValidator);
  }
}
