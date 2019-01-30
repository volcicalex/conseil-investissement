import { TestBed } from '@angular/core/testing';

import { PostService } from './post.service';
import { InjectionToken } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastrModule } from 'ngx-toastr';

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

  it('should be created', () => {
    const service: PostService = TestBed.get(PostService);
    expect(service).toBeTruthy();
  });
});
