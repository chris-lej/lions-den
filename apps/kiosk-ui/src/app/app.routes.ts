import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadComponent: () => import('./components/welcome/welcome.component').then(m => m.WelcomeComponent)
  },
  {
    path: 'menu',
    loadComponent: () => import('./components/menu/menu.component').then(m => m.MenuComponent)
  },
  {
    path: 'manual',
    loadComponent: () => import('./components/manual/manual.component').then(m => m.ManualComponent)
  },
  {
    path: 'wifi',
    loadComponent: () => import('./components/wifi/wifi.component').then(m => m.WifiComponent)
  },
  {
    path: 'guide',
    loadComponent: () => import('./components/guide/guide.component').then(m => m.GuideComponent)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./components/checkout/checkout.component').then(m => m.CheckoutComponent)
  }
];
