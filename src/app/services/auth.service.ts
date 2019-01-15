import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database'
import { AngularFireAuth } from 'angularfire2/auth'
import { User } from '../models/user';
import { Router } from '@angular/router';

import { BehaviorSubject, from } from 'rxjs'
import { Observable } from 'rxjs'
import { of } from 'rxjs'

import 'rxjs-compat/add/operator/switchMap' 
import { ToastrService } from 'ngx-toastr';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User>

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private toastr: ToastrService,
              private router: Router) {  
    this.user = this.afAuth.authState.switchMap(auth => {
      if (auth){
        return this.db.object('users/' + auth.uid).valueChanges()
      } else {
        return of(null)
      }
    })
}

  createNewUser(user: User, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(user.email, password).then(
          () => {
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
            //this.updateUser(credential.user)
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

  private updateUser(authData){
    const userData = new User(authData)
    const ref = this.db.object('users/' + authData.uid)
    ref.valueChanges().subscribe((user:User) => {
      if (!user.roles) {
        ref.update(userData)
      }
    })
  }
}
