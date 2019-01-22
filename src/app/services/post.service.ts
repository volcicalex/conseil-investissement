import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'
import * as _ from 'lodash'
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

import 'rxjs-compat/add/operator/map'
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  userRoles: Array<string>;

  constructor(private auth: AuthService,
              private db: AngularFireDatabase,
              private toastr: ToastrService) {
    auth.user.map(user => {
      return this.userRoles = _.keys(_.get(user, 'roles'))
    }).subscribe()
  }

  getPosts(){
    return this.db.list('posts')
  }

  getPost(key){
    return this.db.object('posts/' + key)
  }

  canRead(): boolean{
    const allowed = ['admin', 'author', 'reader']
    return this.matchingRole(allowed)
  }

  canEdit(): boolean {
    const allowed = ['admin', 'author']
    return this.matchingRole(allowed)
  }

  canDelete(): boolean {
    const allowed = ['admin']
    return this.matchingRole(allowed)
  }

  matchingRole(allowedRoles): boolean {
    return !_.isEmpty(_.intersection(allowedRoles, this.userRoles))
  }

  editPost(newData: Post){
    if (this.canEdit) {
      return this.db.object('posts/' + newData.id).update(newData)
    }
    else this.toastr.error("Action refusée")
  }

  deletePost(key) {
    if (this.canDelete) {
      return this.db.list('posts/' + key).remove()
    }
    else this.toastr.error('Action refusée')
  }

  likePost(newData: Post) {
    return this.db.object('posts/' + newData.id).update(newData)
  }
  
}
