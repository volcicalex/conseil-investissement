import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { SignUpComponent } from './authentification/sign-up/sign-up.component';
import { SignInComponent } from './authentification/sign-in/sign-in.component';
import { AuthorGuard } from './guard/author.guard';

export const appRoutes: Routes = [
    { path: 'auth/signup', component: SignUpComponent },
    { path: 'auth/signin', component: SignInComponent },
    { path: 'accueil', component: AccueilComponent },
    { path: '', redirectTo: 'accueil', pathMatch: 'full' },
    { path: '**', redirectTo: 'accueil' }
  ];