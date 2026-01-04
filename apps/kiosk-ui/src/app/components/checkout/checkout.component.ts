import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { 
  NbCardModule, 
  NbButtonModule, 
  NbLayoutModule, 
  NbThemeModule,
  NbIconModule,
  NbListModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

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
    NbCardModule, 
    NbButtonModule, 
    NbLayoutModule, 
    NbThemeModule,
    NbIconModule,
    NbListModule,
    NbEvaIconsModule
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
      icon: 'clock-outline',
      title: 'Checkout Time',
      description: `Please check out by ${this.checkoutTime} on your departure date.`
    },
    {
      icon: 'home-outline',
      title: 'Leave Keys',
      description: 'Please leave all keys on the kitchen counter or in the lockbox.'
    },
    {
      icon: 'trash-2-outline',
      title: 'Dispose of Trash',
      description: 'Please take out trash and place in the designated bins outside.'
    },
    {
      icon: 'droplet-outline',
      title: 'Dishes',
      description: 'Please wash and put away any dishes you used during your stay.'
    },
    {
      icon: 'thermometer-outline',
      title: 'Adjust Thermostat',
      description: 'Please set the thermostat to 68°F (20°C) before leaving.'
    },
    {
      icon: 'lock-outline',
      title: 'Lock Up',
      description: 'Please ensure all doors and windows are locked when you leave.'
    }
  ];

  lateCheckout = {
    available: true,
    message: 'Late checkout may be available upon request. Please contact the host at least 24 hours in advance.'
  };
}
