import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { InjectionToken } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastrModule } from 'ngx-toastr';
import { User } from '../models/user';
import { FormGroup, FormBuilder } from '@angular/forms';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[ToastrModule.forRoot()],
    providers: [{
      provide: AngularFireAuth,
      useValue: {}}, {
      provide: AngularFireDatabase,
      useValue: {}}, {
      provide: InjectionToken,
      useValue: {}}]
  }));

  it('should connect a user', () => {
    let formBuilder = new FormBuilder();
    let signupForm = formBuilder.group({
      nom: "Volcic",
      prenom: "Alexandre",
      pseudo: "volcica",
      email: "alexandre@volcic.fr",
      password: "volcica",
      isAdmin: true, isAuthor: true
    });
    var promise = AuthService.prototype.signInUser(signupForm.value.email, signupForm.value.password)
    expect(promise)
  });
});
