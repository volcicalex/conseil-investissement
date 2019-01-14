import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { Rubric } from '../models/rubric';

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

  addCategory(newData: Rubric){
    if (this.canEdit) {
      return this.db.object('categories/' + newData.id).update(newData)
    }
    else this.toastr.error("Action refusée")
  }

  deleteCategory(key: string){
    if (this.canDelete) {
      return this.db.list('categories/' + key).remove()
    }
    else this.toastr.error('Action refusée')
  }
}
