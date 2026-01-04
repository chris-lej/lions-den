import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

/**
 * House Manual component displaying rules, how-to guides, and emergency information.
 * Offline-first content.
 */
@Component({
  selector: 'app-manual',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatCardModule, 
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    TranslateModule
  ],
  templateUrl: './manual.component.html',
  styleUrl: './manual.component.scss'
})
export class ManualComponent implements OnInit {
  sections: Array<{
    titleKey: string;
    icon: string;
    items: string[];
  }> = [];

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.loadSections();
    // Reload when language changes
    this.translate.onLangChange.subscribe(() => {
      this.loadSections();
    });
  }

  private loadSections(): void {
    this.translate.get([
      'manual.houseRules.title',
      'manual.houseRules.items',
      'manual.howTo.title',
      'manual.howTo.items',
      'manual.emergency.title',
      'manual.emergency.items',
      'manual.important.title',
      'manual.important.items'
    ]).subscribe(translations => {
      this.sections = [
        {
          titleKey: 'manual.houseRules.title',
          icon: 'home',
          items: translations['manual.houseRules.items'] as string[]
        },
        {
          titleKey: 'manual.howTo.title',
          icon: 'menu_book',
          items: translations['manual.howTo.items'] as string[]
        },
        {
          titleKey: 'manual.emergency.title',
          icon: 'warning',
          items: translations['manual.emergency.items'] as string[]
        },
        {
          titleKey: 'manual.important.title',
          icon: 'info',
          items: translations['manual.important.items'] as string[]
        }
      ];
    });
  }
}
