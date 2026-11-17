import {NgModule} from '@angular/core';
import { TuiBlock, TuiInputSlider, TuiInputNumber } from '@taiga-ui/kit';
import { TuiFormatNumberPipe, TuiGroup, TuiButton, TuiRadio } from '@taiga-ui/core';

@NgModule({
  exports: [
    ...TuiInputSlider,
    ...TuiInputNumber,
    TuiGroup,
    TuiButton,
    TuiFormatNumberPipe,
    TuiBlock, ...TuiRadio
  ]
})
export class TaigaUiModule {
}
