import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRubricComponent } from './add-rubric.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { InjectionToken } from '@angular/core';

describe('AddRubricComponent', () => {
  let component: AddRubricComponent;
  let fixture: ComponentFixture<AddRubricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRubricComponent ],
      imports: [MatFormFieldModule, FormsModule, ReactiveFormsModule, ToastrModule.forRoot()],
      providers: [{
        provide: MatDialogRef,
        useValue: {}}, {
        provide: MAT_DIALOG_DATA,
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
    fixture = TestBed.createComponent(AddRubricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
