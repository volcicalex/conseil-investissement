import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPostComponent } from './edit-post.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('EditPostComponent', () => {
  let component: EditPostComponent;
  let fixture: ComponentFixture<EditPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPostComponent ],
      providers: [{
        provide: MatDialogRef,
        useValue: {}}, {
        provide: MAT_DIALOG_DATA,
        useValue: {}}, {
        provide: MatDialog,
        useValue:{}
        }] 
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
