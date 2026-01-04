import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NbThemeService, NbThemeOptions, NB_THEME_OPTIONS } from '@nebular/theme';

import { routes } from './app.routes';

const themeOptions: NbThemeOptions = {
  name: 'default'
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAnimations(),
    NbThemeService,
    { provide: NB_THEME_OPTIONS, useValue: themeOptions }
  ]
};
