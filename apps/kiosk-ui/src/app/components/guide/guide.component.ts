import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { 
  NbCardModule, 
  NbButtonModule, 
  NbLayoutModule, 
  NbThemeModule,
  NbIconModule,
  NbTabsetModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

/**
 * Local Area Guide component with restaurants, attractions, and local tips.
 * Offline-first content.
 */
@Component({
  selector: 'app-guide',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    NbCardModule, 
    NbButtonModule, 
    NbLayoutModule, 
    NbThemeModule,
    NbIconModule,
    NbTabsetModule,
    NbEvaIconsModule
  ],
  templateUrl: './guide.component.html',
  styleUrl: './guide.component.scss'
})
export class GuideComponent {
  restaurants = [
    {
      name: 'Local Bistro',
      cuisine: 'American',
      distance: '0.3 miles',
      description: 'Cozy neighborhood spot with great brunch',
      icon: 'restaurant-outline'
    },
    {
      name: 'Sushi House',
      cuisine: 'Japanese',
      distance: '0.5 miles',
      description: 'Fresh sushi and sashimi',
      icon: 'restaurant-outline'
    },
    {
      name: 'Pizza Corner',
      cuisine: 'Italian',
      distance: '0.2 miles',
      description: 'Authentic wood-fired pizza',
      icon: 'restaurant-outline'
    }
  ];

  attractions = [
    {
      name: 'City Park',
      type: 'Park',
      distance: '0.8 miles',
      description: 'Beautiful park with walking trails and playground',
      icon: 'map-outline'
    },
    {
      name: 'Art Museum',
      type: 'Museum',
      distance: '1.2 miles',
      description: 'Local art and history exhibits',
      icon: 'image-outline'
    },
    {
      name: 'Shopping District',
      type: 'Shopping',
      distance: '0.6 miles',
      description: 'Boutique shops and cafes',
      icon: 'shopping-bag-outline'
    }
  ];

  tips = [
    'Best coffee: Local Bistro (0.3 miles)',
    'Grocery store: Market Street (0.4 miles)',
    'Pharmacy: Corner Drug Store (0.3 miles)',
    'Public transit: Bus stop 2 blocks away',
    'Parking: Street parking available, check signs for restrictions',
    'Weather: Check local forecast before heading out'
  ];
}
