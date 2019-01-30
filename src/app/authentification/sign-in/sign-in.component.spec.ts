import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from '../../header/header.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { InjectionToken, NO_ERRORS_SCHEMA } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let auth: AuthService;
  let builder: FormBuilder;
  let routeur: Router;
  let toast: ToastrService


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInComponent, HeaderComponent ],
      imports: [MatCardModule, ReactiveFormsModule,
        ToastrModule.forRoot()],
      providers: [{
        provide: AngularFireAuth,
        useValue: {}}, {
        provide: AngularFireDatabase,
        useValue: {}}, {
        provide: InjectionToken,
        useValue: {}}],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
  
});
