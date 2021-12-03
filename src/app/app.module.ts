import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {TaigaUiModule} from './taiga-ui/taiga-ui.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CalculateComponent} from './calculate/calculate.component';
import {ListComponent} from './list/list.component';
import {STORAGE_PROVIDER} from './storage/storage.providers';
import { CheckedComponent } from './checked/checked.component';
import { CostComponent } from './cost/cost.component';
import {CONFIG_PROVIDER} from "./config/config.provider";

@NgModule({
  declarations: [
    AppComponent,
    CalculateComponent,
    ListComponent,
    CheckedComponent,
    CostComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    TaigaUiModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),

  ],
  providers: [
    STORAGE_PROVIDER,
    CONFIG_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
