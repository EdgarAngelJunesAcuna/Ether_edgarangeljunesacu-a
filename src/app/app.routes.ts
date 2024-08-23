import { Routes } from '@angular/router';
import { EthersJsComponent } from './ethers.js/ethers.js.component';

export const routes: Routes = [
  { path: 'ethers', component: EthersJsComponent },
  { path: '', redirectTo: '/ethers', pathMatch: 'full' }, // Redirección inicial a 'ethers'
  { path: '**', redirectTo: '/ethers' } // Redirección para rutas no encontradas
];