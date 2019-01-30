import { TestBed, async, inject } from '@angular/core/testing';

import { AdminGuard } from './admin.guard';
import { AngularFireAuth } from 'angularfire2/auth';
import { InjectionToken } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastrComponentlessModule, ToastrModule } from 'ngx-toastr';

describe('AdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot()],
      providers: [AdminGuard, {
        provide: AngularFireDatabase,
        useValue: {}}, {
        provide: AngularFireAuth,
        useValue: {}}, {
        provide: InjectionToken,
        useValue: {}}]
    });
  });

  it('should ...', inject([AdminGuard], (guard: AdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
