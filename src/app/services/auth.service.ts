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




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User>

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private router: Router) {  
    this.user = this.afAuth.authState.switchMap(auth => {
      if (auth){
        return this.db.object('users/' + auth.uid).valueChanges()
      } else {
        return of(null)
      }
    })
}

  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          (credential) => {
            this.createUser(credential.user)
            resolve();
          },
          (error) => {
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
            this.updateUser(credential.user)
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signOutUser() {
    this.afAuth.auth.signOut()
  }

  private createUser(authData){
    const userData = new User(authData)
    const ref = this.db.object('users/' + authData.uid)
    ref.set(userData)
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
