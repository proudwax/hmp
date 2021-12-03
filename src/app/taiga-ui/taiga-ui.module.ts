import {NgModule} from '@angular/core';
import {TuiInputNumberModule, TuiInputSliderModule, TuiRadioBlockModule} from '@taiga-ui/kit';
import {TuiButtonModule, TuiFormatNumberPipeModule, TuiGroupModule, TuiTextfieldControllerModule} from '@taiga-ui/core';

@NgModule({
  exports: [
    TuiInputSliderModule,
    TuiInputNumberModule,
    TuiTextfieldControllerModule,
    TuiGroupModule,
    TuiButtonModule,
    TuiFormatNumberPipeModule,
    TuiRadioBlockModule
  ]
})
export class TaigaUiModule {
}
