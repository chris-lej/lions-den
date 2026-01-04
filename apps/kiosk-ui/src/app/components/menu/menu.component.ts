import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Main menu component providing access to all concierge features.
 */
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  menuItems = [
    {
      titleKey: 'menu.houseManual.title',
      descriptionKey: 'menu.houseManual.description',
      route: '/manual',
      icon: 'menu_book',
      available: true
    },
    {
      titleKey: 'menu.wifi.title',
      descriptionKey: 'menu.wifi.description',
      route: '/wifi',
      icon: 'wifi',
      available: true
    },
    {
      titleKey: 'menu.guide.title',
      descriptionKey: 'menu.guide.description',
      route: '/guide',
      icon: 'map',
      available: true
    },
    {
      titleKey: 'menu.checkout.title',
      descriptionKey: 'menu.checkout.description',
      route: '/checkout',
      icon: 'exit_to_app',
      available: true
    }
  ];
}
