import { User } from './../model/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';

@Injectable()
export class AuthProvider {

  constructor(
    public afAuth: AngularFireAuth,
  ) 
  {
    
  }

  signIn(user: {email: string, password: string}): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  createUser(user: {email: string, password: string}) : Promise<firebase.User> {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  logoutUser(): Promise<any> {
    return this.afAuth.auth.signOut( );
  }
 
  
}
