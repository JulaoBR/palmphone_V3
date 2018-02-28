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

  updadeUser(user: {email: string, password: string}) : Promise<any> {
    var usu = firebase.auth().currentUser;
    return usu.updateEmail(user.email).then(function() {
      
    }).catch()
  }

  logoutUser(): Promise<any> {
    return this.afAuth.auth.signOut( );
  }
 
  
}
