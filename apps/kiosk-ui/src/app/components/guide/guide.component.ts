import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

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
    MatCardModule, 
    MatButtonModule, 
    MatIconModule,
    MatTabsModule
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
      icon: 'restaurant'
    },
    {
      name: 'Sushi House',
      cuisine: 'Japanese',
      distance: '0.5 miles',
      description: 'Fresh sushi and sashimi',
      icon: 'restaurant'
    },
    {
      name: 'Pizza Corner',
      cuisine: 'Italian',
      distance: '0.2 miles',
      description: 'Authentic wood-fired pizza',
      icon: 'restaurant'
    }
  ];

  attractions = [
    {
      name: 'City Park',
      type: 'Park',
      distance: '0.8 miles',
      description: 'Beautiful park with walking trails and playground',
      icon: 'park'
    },
    {
      name: 'Art Museum',
      type: 'Museum',
      distance: '1.2 miles',
      description: 'Local art and history exhibits',
      icon: 'museum'
    },
    {
      name: 'Shopping District',
      type: 'Shopping',
      distance: '0.6 miles',
      description: 'Boutique shops and cafes',
      icon: 'shopping_bag'
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
