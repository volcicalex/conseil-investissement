import { TestBed } from '@angular/core/testing';

import { PostService } from './post.service';
import { InjectionToken } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';

describe('PostService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ToastrModule.forRoot()],
    providers: [{
      provide: AngularFireDatabase,
      useValue: {}}, {
      provide: AngularFireAuth,
      useValue: {}}, {
      provide: InjectionToken,
      useValue: {}}]
  }));

  it('should access to posts', () => {
    let angularFireAuth = AngularFireAuth.prototype
    let angularFireDb = AngularFireDatabase.prototype
    let toastrService = ToastrService.prototype

    let authService = new AuthService(angularFireAuth, angularFireDb, toastrService)
    let postService = new PostService(authService, angularFireDb, toastrService)
    var promise = postService.getPosts()
    expect(promise).toBeDefined()
  });
});
