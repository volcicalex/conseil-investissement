import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostComponent } from './add-post.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { InjectionToken } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

describe('AddPostComponent', () => {
  let component: AddPostComponent;
  let fixture: ComponentFixture<AddPostComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPostComponent ],
      imports: [MatDialogModule, MatFormFieldModule, MatOptionModule, MatSelectModule, 
        FormsModule, ReactiveFormsModule, ToastrModule.forRoot()],
      providers: [{
        provide: MatDialogRef,
        useValue: {}}, {
        provide: AngularFireAuth,
        useValue: {}}, {
        provide: AngularFireDatabase,
        useValue: {}}, {
        provide: InjectionToken,
        useValue: {}}] 
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
