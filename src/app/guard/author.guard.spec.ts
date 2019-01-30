import { TestBed, async, inject } from '@angular/core/testing';

import { AuthorGuard } from './author.guard';
import { AngularFireAuth } from 'angularfire2/auth';
import { InjectionToken } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireDatabase } from 'angularfire2/database';

describe('AuthorGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot()],
      providers: [AuthorGuard, {
        provide: AngularFireDatabase,
        useValue: {}}, {
        provide: AngularFireAuth,
        useValue: {}}, {
        provide: InjectionToken,
        useValue: {}}]
    });
  });

  it('should ...', inject([AuthorGuard], (guard: AuthorGuard) => {
    expect(guard).toBeTruthy();
  }));
});
