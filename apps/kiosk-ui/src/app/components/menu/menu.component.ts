import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { 
  NbCardModule, 
  NbButtonModule, 
  NbLayoutModule,
  NbThemeModule,
  NbIconModule 
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

/**
 * Main menu component providing access to all concierge features.
 */
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NbCardModule,
    NbButtonModule,
    NbLayoutModule,
    NbThemeModule,
    NbIconModule,
    NbEvaIconsModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  menuItems = [
    {
      title: 'House Manual',
      description: 'Rules, how-to guides, and emergency information',
      route: '/manual',
      icon: 'book-outline',
      available: true
    },
    {
      title: 'Wi-Fi Information',
      description: 'Network name and password',
      route: '/wifi',
      icon: 'wifi-outline',
      available: true
    },
    {
      title: 'Local Area Guide',
      description: 'Restaurants, attractions, and local tips',
      route: '/guide',
      icon: 'map-outline',
      available: true
    },
    {
      title: 'Checkout Instructions',
      description: 'Checkout time and procedures',
      route: '/checkout',
      icon: 'log-out-outline',
      available: true
    }
  ];
}

