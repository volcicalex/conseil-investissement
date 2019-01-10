import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  userRoles: Array<string>;

  constructor(private auth: AuthService,
              private db: AngularFireDatabase,
              private toastr: ToastrService) {
    auth.user.map(user => {
      return this.userRoles = _.keys(_.get(user, 'roles'))
    }).subscribe()
  }

  getCategories(){
    return this.db.list('categories')
  }

  canEdit(): boolean {
    const allowed = ['admin']
    return this.matchingRole(allowed)
  }

  canDelete(): boolean {
    const allowed = ['admin']
    return this.matchingRole(allowed)
  }

  private matchingRole(allowedRoles): boolean {
    return !_.isEmpty(_.intersection(allowedRoles, this.userRoles))
  }

  addCategory(post, newData){
    if (this.canEdit) {
      return this.db.object('categories/' + post.$key).update(newData)
    }
    else this.toastr.error("Action refusée")
  }
}
