import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { TranslationService, Language } from '../../services/translation.service';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Language selector component for switching between English, Spanish, and Portuguese.
 */
@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    TranslateModule
  ],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss'
})
export class LanguageSelectorComponent {
  currentLang: Language = 'en';
  languages: { code: Language; name: string }[] = [];

  constructor(private translationService: TranslationService) {
    this.languages = this.translationService.getAvailableLanguages();
    this.translationService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  setLanguage(lang: Language): void {
    this.translationService.setLanguage(lang);
  }

  getLanguageName(code: Language): string {
    return this.languages.find(l => l.code === code)?.name || code;
  }
}

