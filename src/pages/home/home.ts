import { ColetorProvider } from './../../providers/coletor';
import { User } from './../../model/user';
import { LoginPage } from './../login/login';
import { ColetorPage } from './../coletor/coletor';
import { PerfilPage } from './../perfil/perfil';
import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, NavParams } from 'ionic-angular';
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
    private storage: Storage,
    private coletor: ColetorProvider ,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public navParams: NavParams   
  ) 
  {  
    this.currentUser = this.navParams.get("dados"); 
    if(this.currentUser == null){
      //RESGATA OS DADOS DO STORAGE 
      this.storage.get(firebase.auth().currentUser.uid).then((val : User) => {
      //E CARREGA O OBJETO COM OS DADOS
       this.currentUser = val;
      })
    }
  }

  private abrirTelaPerfil(){
    //CHAMA A TELA DE PERFIL DO USUARIO E PASSA COMO PARAMETRO O OBJETO 
    this.navCtrl.push(PerfilPage, {dados : this.currentUser});
  }

  //CHAMA A TELA DE COLETA
  private abrirTelaColeta(): void{
    this.navCtrl.push(ColetorPage, {dados : this.currentUser});
  }


  //FUNCAO PARA DESLOGAR
  private singnOut(){

    let alert = this.alertCtrl.create({//ABRE O ALERTA PARA EXIBIR O DADO LIDO
      title: 'Sair',
      message: 'Deseja sair do aplicativo?' ,  //EXIBE PARA O USUARIO O DADO
      buttons: [                                              //E PERGUNTA SE DESEJA SALVAR
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('evento cancelado');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            //CHAMA FUNCAO PARA DELETAR DADOS DO USUARIO GRAVADOS NO STORAGE
            this.deletarDadosUsuarioLogado();
            //CHAMA FUNCAO QUE DESLOGA O USUARIO
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
      ]
    });
    //CHAMA O ALERTA PARA SER EXIBIDO
    alert.present();
  }

  //FUNCAO PARA SINCRONIZAR OS DADOS DAS CHAMADAS SALVOS NO STORAGE COM O FIREBASE
  private sincronizar(){

    let alert = this.alertCtrl.create({//ABRE O ALERTA PARA CONFIRMAR SE DEJESA FINALIZAR A CHAMADA
      title: 'Confirmação',
      message: 'Deseja sincronizar os dados com o servidor?' , 
      buttons: [                             
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('evento cancelado');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            //CRIA UM TOAST DE CONFIRMAÇÂO DE SINCRONIZACAO
            let toast = this.toastCtrl.create({ 
              duration: 3000, 
              position: 'bottom',
              message: 'Sincronização Realizada com sucesso!'  
            });

            //PEGA O UID DO USUARIO QUE ESTA LOGADO
            var uid = firebase.auth().currentUser.uid;
            //FOREACH PARA CORRER O STORAGE
            this.storage.forEach((value, key) => {
              //VERIFICA OS DADOS DAS CHAMAS QUE FOREM DIFERENTE DO UID DO USUARIO
              if(key != uid){
                //CHAMA FUNCAO PARA SALVAR NO FIREBASE
                this.coletor.saveChamadas(value, key);
                //CHAMA FUNCAO PARA APAGAR DADOS DO STORAGE
                this.deletarStorage(uid);
              }
            })
            //CHAMA O TOAST
            toast.present();   
          }
        }
      ]
    });
    //CHAMA O ALERTA PARA SER EXIBIDO
    alert.present(); 
  }

  //FUNCAO PARA DELETAR AS CHAMADAS DO STORAGE
  private deletarStorage(uid: string){
    this.storage.forEach((value, key) => {
      //VERIFICA PARA APAGAR SOMENTE OS DADOS DAS CHAMADAS
      if(key != uid){
        //REMOVE A CHAMADA
        this.storage.remove(key);
      }
    })
  }

  //FUNCAO PARA DELETAR OS DADOS DO USUARIO SALVO NO STORAGE
  private deletarDadosUsuarioLogado(){
    //PEGA O UID DO USUARIO QUE ESTA LOGADO
    var uid = firebase.auth().currentUser.uid;
    //REMOVE O DADOS DO USUARIO 
    this.storage.remove(uid);
  }

}
