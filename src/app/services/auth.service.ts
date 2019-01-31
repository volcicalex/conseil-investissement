import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database'
import { AngularFireAuth } from 'angularfire2/auth'
import { User } from '../models/user';
import { Router } from '@angular/router';
import * as _ from 'lodash'

import { BehaviorSubject, from } from 'rxjs'
import { Observable } from 'rxjs'
import { of } from 'rxjs'

import 'rxjs-compat/add/operator/switchMap' 
import { ToastrService } from 'ngx-toastr';
import { PostService } from './post.service';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User>
  userRoles: Array<string>;

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private toastr: ToastrService) {  
    this.user = this.afAuth.authState.switchMap(auth => {
      if (auth){
        return this.db.object('users/' + auth.uid).valueChanges()
      } else {
        return of(null)
      }
    })
    this.user.map(user => {
      return this.userRoles = _.keys(_.get(user, 'roles'))
    }).subscribe()
}

  createNewUser(user: User, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(user.email, password).then(
          (credential) => {
            user.id = credential.user.uid
            this.createUser(user)
            resolve();
          },
          (error) => {
            this.toastr.error("Erreur dans la création")
            reject(error);
          }
        );
      }
    );
  }

  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          (credential) => {
            resolve();
          },
          (error) => {
            this.toastr.error("Erreur de connexion")
            reject(error);
          }
        );
      }
    );
  }

  signOutUser() {
    this.afAuth.auth.signOut()
  }

  private createUser(user: User){
    const ref = this.db.object('users/' + user.id)
    ref.set(user)
  }

  canManage(): boolean {
    const allowed = ['admin']
    return this.matchingRole(allowed)
  }

  matchingRole(allowedRoles): boolean {
    return !_.isEmpty(_.intersection(allowedRoles, this.userRoles))
  }

  getUsers(){
    if (this.canManage) return this.db.list('users') 
    else this.toastr.error("Action refusée")
  }

  updateUser(user: User){
    const ref = this.db.object('users/' + user.id)
    if (this.canManage) return ref.update(user)
    else this.toastr.error("Action refusée")
  }

  deleteUser(user: User){
    if (this.canManage){
      const ref = this.db.object('users/' + user.id)

      if (this.canManage) return ref.remove()
      else this.toastr.error("Erreur de suppression")
    }
    else this.toastr.error("Action refusée")
  }
}
