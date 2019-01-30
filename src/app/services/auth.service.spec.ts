import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { InjectionToken } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastrModule } from 'ngx-toastr';


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

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
