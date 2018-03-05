import { User } from './../model/user';
import { BaseProvider } from './base';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from "angularfire2";

import * as firebase from 'firebase/app';
import 'firebase/storage';

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
  public get() {
    //PEGA O UID DO USUARIO LOGADO
    var key = firebase.auth().currentUser.uid;
    return this.db.object(this.PATH + key).snapshotChanges()
      .map(c => {
        return { key: c.key, ...c.payload.val() };
      });
  }
 
  //UPDATE DO USUARIO
  public update(user: any): Promise<any> {
     return this.db.list(`/professor/`)
    .update(user.key, {nomeProf: user.nomeProf, rgProf: user.rgProf, dataNascProf: user.dataNascProf, url: user.url})
    .catch();
  }

  //CRIA O USUARIO
  public create(user: any): Promise<any> {
    return this.db.object(`/professor/${user.key}`)
   .set(user)
   .catch();
 }

 //FAZ O UPLOAD DA FOTO
 public uploadPhoto(file: File, userId: string): firebase.storage.UploadTask {
  return firebase.storage().ref().child(`/fotoPerfilProfessor/${userId + '.jpg'}`).put(file);
}

}
