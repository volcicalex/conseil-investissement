import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUserComponent } from './manage-user.component';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../header/header.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { InjectionToken } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

describe('ManageUserComponent', () => {
  let component: ManageUserComponent;
  let fixture: ComponentFixture<ManageUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageUserComponent, HeaderComponent],
      imports: [MatIconModule, MatFormFieldModule, MatPaginatorModule, MatTableModule, ToastrModule.forRoot() ],
      providers:[{
        provide: AngularFireDatabase,
        useValue: {}}, {
        provide: AngularFireAuth,
        useValue: {}}, {
        provide: InjectionToken,
        useValue: {}}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
