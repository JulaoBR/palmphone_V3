import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';
import { User } from '../model/user';


@Injectable()
export class AuthProvider {

  constructor(
    public afAuth: AngularFireAuth,
  ) 
  {
    
  }

  signIn(user: User): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.passaword);
  }

  createUser(user: User): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.passaword);
  }

  logoutUser(): Promise<any> {
    return this.afAuth.auth.signOut( );
  }
 
}
