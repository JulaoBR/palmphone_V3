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
    private fb: FirebaseApp,
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
  public update(user: User): Promise<any> {
     return this.db.list(`/professor/`)
    .update(user.$key, {nomeProf: user.nomeProf, rgProf: user.rgProf, dataNascProf: user.dataNascProf})
    .catch();
  }

  //CRIA O USUARIO
  public create(user: User): Promise<any> {
    return this.db.object(`/professor/${user.$key}`)
   .set(user)
   .catch();
 }

 public uploadAndSave(item: User, fileToUpload: string, uuid: string ) {
  let usuario = item;
  usuario.$key = uuid;
  if (usuario.$key) {
    //SE FOR ATUALIZAÇÂO
    this.update(item);
  } else {
    //NOVO USUARIO
    let storageRef = this.fb.storage().ref();
    let basePath = '/fotoPerfilProfessor/' + firebase.auth().currentUser.uid;
    usuario.fullPath = basePath + '/' + usuario.nomeProf + '.jpg';
    let uploadTask = storageRef.child(usuario.fullPath).putString(fileToUpload, 'base64');

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,(snapshot) => {
      //var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //console.log(progress + "% done");
    },
    (error) => {
      console.error(error);
    },
    () => {
      usuario.url = uploadTask.snapshot.downloadURL;
      //CHAMA FUNCAO PARA NOVO USUARIO
      this.create(usuario);
    });
  }
}
 
}
