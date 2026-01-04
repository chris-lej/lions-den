import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { TranslateService, MissingTranslationHandler, MissingTranslationHandlerParams, provideTranslateCompiler, provideTranslateParser, TranslateNoOpCompiler, TranslateDefaultParser } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';

// Missing translation handler
export class CustomMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    return params.key;
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withFetch()),
    provideTranslateCompiler(TranslateNoOpCompiler),
    provideTranslateParser(TranslateDefaultParser),
    TranslateService,
    ...provideTranslateHttpLoader({
      prefix: './assets/i18n/',
      suffix: '.json'
    }),
    {
      provide: MissingTranslationHandler,
      useClass: CustomMissingTranslationHandler
    }
  ]
};
