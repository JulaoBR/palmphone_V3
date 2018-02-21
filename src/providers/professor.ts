import { User } from './../model/user';
import { BaseProvider } from './base';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import * as firebase from 'firebase/app';
import { FirebaseApp } from 'angularfire2';

@Injectable()
export class ProfessorProvider extends BaseProvider {

  private PATH = 'professor/';
  
  constructor(
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public firebaseApp: FirebaseApp,
  ) 
  {
    super();
  }

  //BUSCA APENAS UM OBJETO
  get() {
    //PEGA O UID DO USUARIO LOGADO
    var key = firebase.auth().currentUser.uid;
    return this.db.object(this.PATH + key).snapshotChanges()
      .map(c => {
        return { key: c.key, ...c.payload.val() };
      });
  }
 
  //SALVA O USUARIO
  save(user: User, uuid: string): Promise<any> {
     return this.db.object(`/professor/${uuid}`)
    .set(user)
    .catch();
  }
 
}
