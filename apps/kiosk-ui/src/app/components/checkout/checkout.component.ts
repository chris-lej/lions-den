import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

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
    MatListModule,
    TranslateModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  // TODO: These should be configurable
  checkoutTime = '11:00 AM';
  checkoutDate = new Date(); // Will be calculated based on stay

  instructions: Array<{
    icon: string;
    titleKey: string;
    descriptionKey: string;
  }> = [
    {
      icon: 'schedule',
      titleKey: 'checkout.instructions.checkoutTime.title',
      descriptionKey: 'checkout.instructions.checkoutTime.description'
    },
    {
      icon: 'home',
      titleKey: 'checkout.instructions.leaveKeys.title',
      descriptionKey: 'checkout.instructions.leaveKeys.description'
    },
    {
      icon: 'delete',
      titleKey: 'checkout.instructions.disposeTrash.title',
      descriptionKey: 'checkout.instructions.disposeTrash.description'
    },
    {
      icon: 'restaurant',
      titleKey: 'checkout.instructions.dishes.title',
      descriptionKey: 'checkout.instructions.dishes.description'
    },
    {
      icon: 'thermostat',
      titleKey: 'checkout.instructions.adjustThermostat.title',
      descriptionKey: 'checkout.instructions.adjustThermostat.description'
    },
    {
      icon: 'lock',
      titleKey: 'checkout.instructions.lockUp.title',
      descriptionKey: 'checkout.instructions.lockUp.description'
    }
  ];

  lateCheckout = {
    available: true,
    messageKey: 'checkout.lateCheckout'
  };

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    // Instructions are already defined in the class
  }
}
