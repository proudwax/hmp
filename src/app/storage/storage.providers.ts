import {LocalStorageService} from './local-storage.service';
import {AbstractStorage} from './abstract-storage';
import {MemoryStorageService} from './memory-storage.service';
import {SessionStorageService} from './session-storage.service';
import {InjectionToken, Provider} from '@angular/core';

function StorageFactory(window: Window): AbstractStorage {
  if (window.localStorage) {
    return new LocalStorageService(window.localStorage);
  }

  if (window.sessionStorage) {
    return new SessionStorageService(window.sessionStorage);
  }

  return new MemoryStorageService();
}

export const APP_STORAGE = new InjectionToken<AbstractStorage>('Storage');

export const STORAGE_PROVIDER: Provider[] = [
  {
    provide: window,
    useValue: window
  },
  {
    provide: APP_STORAGE,
    deps: [window],
    useFactory: StorageFactory
  }
];
