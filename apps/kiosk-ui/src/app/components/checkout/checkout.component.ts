import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

/**
 * Checkout Instructions component.
 * Offline-first content.
 */
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule,
    MatListModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  // TODO: These should be configurable
  checkoutTime = '11:00 AM';
  checkoutDate = new Date(); // Will be calculated based on stay

  instructions = [
    {
      icon: 'schedule',
      title: 'Checkout Time',
      description: `Please check out by ${this.checkoutTime} on your departure date.`
    },
    {
      icon: 'home',
      title: 'Leave Keys',
      description: 'Please leave all keys on the kitchen counter or in the lockbox.'
    },
    {
      icon: 'delete',
      title: 'Dispose of Trash',
      description: 'Please take out trash and place in the designated bins outside.'
    },
    {
      icon: 'restaurant',
      title: 'Dishes',
      description: 'Please wash and put away any dishes you used during your stay.'
    },
    {
      icon: 'thermostat',
      title: 'Adjust Thermostat',
      description: 'Please set the thermostat to 68°F (20°C) before leaving.'
    },
    {
      icon: 'lock',
      title: 'Lock Up',
      description: 'Please ensure all doors and windows are locked when you leave.'
    }
  ];

  lateCheckout = {
    available: true,
    message: 'Late checkout may be available upon request. Please contact the host at least 24 hours in advance.'
  };
}
