import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { InjectionToken } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireDatabase } from 'angularfire2/database';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [ToastrModule.forRoot()],
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
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
