import { TuiTextfieldControllerModule, TuiInputNumberModule, TuiInputSliderModule } from "@taiga-ui/legacy";
import {NgModule} from '@angular/core';
import { TuiBlock, TuiRadio } from '@taiga-ui/kit';
import { TuiFormatNumberPipe, TuiGroup, TuiButton } from '@taiga-ui/core';

@NgModule({
  exports: [
    TuiInputSliderModule,
    TuiInputNumberModule,
    TuiTextfieldControllerModule,
    TuiGroup,
    TuiButton,
    TuiFormatNumberPipe,
    TuiBlock, ...TuiRadio
  ]
})
export class TaigaUiModule {
}
