import {
  DOCUMENT,
  inject,
  NgModule,
  provideAppInitializer,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { provideTaiga } from '@taiga-ui/core';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { CalculateComponent } from './calculate/calculate.component';
import { CheckedComponent } from './checked/checked.component';
import { CONFIG_PROVIDER } from './config/config.provider';
import { CostComponent } from './cost/cost.component';
import { ListComponent } from './list/list.component';
import { STORAGE_PROVIDER } from './storage/storage.providers';

const initializer = () => {
  const document = inject(DOCUMENT);
  const theme = localStorage?.getItem('tuiDark');

  if (
    theme === 'true' ||
    (!theme && matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.body.setAttribute('tuiTheme', 'dark');
  }
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    CalculateComponent,
    ListComponent,
    CheckedComponent,
    CostComponent,
    BrowserModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    STORAGE_PROVIDER,
    CONFIG_PROVIDER,
    provideTaiga(),
    provideAppInitializer(initializer),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
