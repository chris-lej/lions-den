import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { 
  NbCardModule, 
  NbButtonModule, 
  NbLayoutModule, 
  NbThemeModule,
  NbAccordionModule,
  NbIconModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

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
    NbCardModule, 
    NbButtonModule, 
    NbLayoutModule, 
    NbThemeModule,
    NbAccordionModule,
    NbIconModule,
    NbEvaIconsModule
  ],
  templateUrl: './manual.component.html',
  styleUrl: './manual.component.scss'
})
export class ManualComponent {
  sections = [
    {
      title: 'House Rules',
      icon: 'home-outline',
      content: [
        'No smoking inside the property',
        'No parties or events without prior approval',
        'Quiet hours: 10 PM - 8 AM',
        'Maximum occupancy: 4 guests',
        'Please respect the neighbors',
        'No pets allowed (unless pre-approved)'
      ]
    },
    {
      title: 'How-To Guides',
      icon: 'book-outline',
      content: [
        'Wi-Fi: Network name and password are in the Wi-Fi section',
        'Heating/Cooling: Thermostat is located in the living room',
        'Kitchen: All appliances are ready to use, please clean after use',
        'Laundry: Washer and dryer are in the utility room',
        'Parking: One designated spot available, see map in guide section',
        'Checkout: See checkout instructions section for details'
      ]
    },
    {
      title: 'Emergency Information',
      icon: 'alert-circle-outline',
      content: [
        'Emergency Services: Dial 911',
        'Fire Department: 911',
        'Police: 911',
        'Medical Emergency: 911',
        'Property Manager: [Contact info to be configured]',
        'Nearest Hospital: [Location to be configured]',
        'Poison Control: 1-800-222-1222'
      ]
    },
    {
      title: 'Important Notes',
      icon: 'info-outline',
      content: [
        'First aid kit is located in the bathroom cabinet',
        'Fire extinguisher is in the kitchen',
        'Emergency exit routes are posted on the back of the front door',
        'If you need assistance, use the concierge menu or contact the host'
      ]
    }
  ];
}
