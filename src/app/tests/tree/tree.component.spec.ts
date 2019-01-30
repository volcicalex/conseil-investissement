import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeComponent } from './tree.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { InjectionToken } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastrModule } from 'ngx-toastr';

describe('TreeComponent', () => {
  let component: TreeComponent;
  let fixture: ComponentFixture<TreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeComponent ],
      imports: [MatTreeModule, MatIconModule, FormsModule, ToastrModule.forRoot()],
      providers: [{
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
    fixture = TestBed.createComponent(TreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
