import { Routes } from '@angular/router';
import { TruffleComponent } from './truffle/truffle.component';

export const routes: Routes = [
  { path: 'truffle', component: TruffleComponent },
  { path: '', redirectTo: '/truffle', pathMatch: 'full' },
  { path: '**', redirectTo: '/truffle' }
];
