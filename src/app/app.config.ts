import { ApplicationConfig, InjectionToken } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideEffects } from '@ngrx/effects'
import { provideStore } from '@ngrx/store'
import { effects, reducers } from 'src/store/app.store'
import { routes } from './app.routes'
import { provideHttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'

export const API_URL = new InjectionToken<string>('API_URL')

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(reducers),
    provideEffects(effects),
    provideHttpClient(),
    { provide: API_URL, useValue: environment.apiUrl },
  ],
}
