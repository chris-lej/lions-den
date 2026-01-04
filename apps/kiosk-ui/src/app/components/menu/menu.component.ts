import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
    MatIconModule
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
      icon: 'menu_book',
      available: true
    },
    {
      title: 'Wi-Fi Information',
      description: 'Network name and password',
      route: '/wifi',
      icon: 'wifi',
      available: true
    },
    {
      title: 'Local Area Guide',
      description: 'Restaurants, attractions, and local tips',
      route: '/guide',
      icon: 'map',
      available: true
    },
    {
      title: 'Checkout Instructions',
      description: 'Checkout time and procedures',
      route: '/checkout',
      icon: 'exit_to_app',
      available: true
    }
  ];
}
