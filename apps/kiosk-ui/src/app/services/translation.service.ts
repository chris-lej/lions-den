import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Language = 'en' | 'es' | 'pt-BR';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLangSubject = new BehaviorSubject<Language>('en');
  public currentLang$: Observable<Language> = this.currentLangSubject.asObservable();

  constructor(private translate: TranslateService) {
    // Set default language
    const savedLang = localStorage.getItem('preferred-language') as Language || 'en';
    this.setLanguage(savedLang);
  }

  setLanguage(lang: Language): void {
    this.translate.use(lang);
    this.currentLangSubject.next(lang);
    localStorage.setItem('preferred-language', lang);
  }

  getCurrentLanguage(): Language {
    return this.currentLangSubject.value;
  }

  getAvailableLanguages(): { code: Language; name: string }[] {
    return [
      { code: 'en', name: 'English' },
      { code: 'es', name: 'Español' },
      { code: 'pt-BR', name: 'Português (BR)' }
    ];
  }
}

