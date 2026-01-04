import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

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
    MatCardModule, 
    MatButtonModule, 
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
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
