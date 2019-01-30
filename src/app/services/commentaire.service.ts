import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { Commentaire } from '../models/commentaire';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {

  userRoles: Array<string>;

  constructor(private auth: AuthService,
              private db: AngularFireDatabase,
              private toastr: ToastrService) {
    auth.user.map(user => {
      return this.userRoles = _.keys(_.get(user, 'roles'))
    }).subscribe()
  }

  canEdit(): boolean {
    const allowed = ['admin', 'author']
    return this.matchingRole(allowed)
  }

  canDelete(): boolean {
    const allowed = ['admin']
    return this.matchingRole(allowed)
  }

  private matchingRole(allowedRoles): boolean {
    return !_.isEmpty(_.intersection(allowedRoles, this.userRoles))
  }

  editComment(idPost: string, comment: Commentaire){
    if (this.canEdit) {
      return this.db.object('posts/' + idPost + '/' + comment.idsFather + '/' + comment.id).update(comment)
    }
    else this.toastr.error("Action refusée")
  }

  deleteComment(idPost: string, linkComment: string){
    if (this.canDelete) {
      return this.db.object('posts/' + idPost + '/' + linkComment).remove()
    }
    else this.toastr.error("Action refusée")
  }
}
