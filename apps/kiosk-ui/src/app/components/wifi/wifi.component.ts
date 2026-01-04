import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { 
  NbCardModule, 
  NbButtonModule, 
  NbLayoutModule, 
  NbThemeModule,
  NbIconModule,
  NbInputModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

/**
 * Wi-Fi Information component displaying network name and password.
 * Offline-first content.
 */
@Component({
  selector: 'app-wifi',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    NbCardModule, 
    NbButtonModule, 
    NbLayoutModule, 
    NbThemeModule,
    NbIconModule,
    NbInputModule,
    NbEvaIconsModule
  ],
  templateUrl: './wifi.component.html',
  styleUrl: './wifi.component.scss'
})
export class WifiComponent {
  // TODO: These should be configurable via admin panel or environment
  wifiNetwork = 'LionsLair_Guest';
  wifiPassword = 'Welcome2024!';
  showPassword = false;

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      // Could show a toast notification here
      console.log('Copied to clipboard:', text);
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
