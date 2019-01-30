import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { SignUpComponent } from './authentification/sign-up/sign-up.component';
import { SignInComponent } from './authentification/sign-in/sign-in.component';
import { AuthorGuard } from './guard/author.guard';
import { ManageUserComponent } from './admin/manage-user/manage-user.component';
import { TreeComponent } from './tests/tree/tree.component';
import { UnitTestingComponent } from './tests/unit-testing/unit-testing.component';

export const appRoutes: Routes = [
    { path: 'auth/signup', component: SignUpComponent },
    { path: 'auth/signin', component: SignInComponent },
    { path: 'accueil', component: AccueilComponent },
    { path: 'manageUser', component: ManageUserComponent },
    { path: 'test', component: UnitTestingComponent },
    { path: '', redirectTo: 'accueil', pathMatch: 'full' },
    { path: '**', redirectTo: 'accueil' }
  ];