import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';

@Injectable()
export class AuthProvider {

  constructor(
    public afAuth: AngularFireAuth
  ) 
  {
    
  }

  //logar com a senha e email
  loginUser(newEmail: string, newPassword: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }

  //envia para o email do usuario caso esqueceu a senha um link para redefinir senha
  resetPassword(email: string): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  //sair do app
  logoutUser(): Promise<void> {
    return this.afAuth.auth.signOut();
  }
}
