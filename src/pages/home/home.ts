import { User } from './../../model/user';
import { LoginPage } from './../login/login';
import { ColetorPage } from './../coletor/coletor';
import { PerfilPage } from './../perfil/perfil';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth';
import { Storage } from '@ionic/storage';

import * as firebase from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //OBJETO DO USUARIO LOGADO
  currentUser:  User;

  constructor(
    public navCtrl: NavController,
    private afAuth: AuthProvider,
    private storage: Storage
  ) 
  {  
    //RESGATA OS DADOS DO STORAGE 
    this.storage.get(firebase.auth().currentUser.uid).then((val : User) => {
      //E CARREGA O OBJETO COM OS DADOS
      this.currentUser = val;
    })

  }

  abrirTelaPerfil(){
    //CHAMA A TELA DE PERFIL DO USUARIO E PASSA COMO PARAMETRO O OBJETO 
    this.navCtrl.push(PerfilPage, {dados : this.currentUser});
  }

  //CHAMA A TELA DE COLETA
  abrirTelaColeta(): void{
    this.navCtrl.push(ColetorPage, {dados : this.currentUser});
  }


  //FUNCAO PARA DESLOGAR
  singnOut(){
    this.afAuth.logoutUser()
      .then(() => {
        //RETORNA PARA A PAGINA DE LOGIN E APAGA OS DADOS SALVOS
        this.navCtrl.setRoot(LoginPage);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
