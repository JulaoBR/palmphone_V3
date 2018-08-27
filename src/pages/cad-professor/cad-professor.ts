import { HomePage } from './../home/home';
import { User } from './../../model/user';
import { AuthProvider } from './../../providers/auth';
import { ProfessorProvider } from './../../providers/professor';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Toast } from 'ionic-angular/components/toast/toast';
import { Storage } from '@ionic/storage';

import * as firebase from 'firebase/app';
import 'firebase/storage';

@IonicPage()
@Component({
  selector: 'page-cad-professor',
  templateUrl: 'cad-professor.html',
})
export class CadProfessorPage {

  private filePhoto: File;
  private form: FormGroup;
  private contact: any;
  //ARQUIVO DAS DISCIPLINAS
  private nomeDisciplinas=[
    {
      "dscDisc": "SIF039 - Redes de Computadores II"
    },
    {
      "dscDisc": "SIF033 - Engenharia de Software III"
    },
    {
      "dscDisc": "SIF040 - Projeto de Sistemas I"
    },
    {
      "dscDisc": "SIF068 - Tópicos em Linguagem de Programação"
    } ,
    {
      "dscDisc": "SIF012 - Linguagem de Programação IV"
    },
    {
      "dscDisc": "SIF032 - Engenharia de Software II"
    },
    {
      "dscDisc": "SIF035 - Interface Humano Computador"
    }        
  ]
     
  constructor(
    public afAuth: AuthProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder, 
    private provider: ProfessorProvider,
    private toastCtrl: ToastController,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
  ) 
  {
    //RECEBE OS DADOS DO FORMULARIO PARA EDIÇÂO
    this.contact = this.navParams.data.contact || { };
    //CRIA O FORMULARIO
    this.createForm();
  }

 
  //CRIA UM FORM COM OS DADOS RECOLHIDOS DO FORM HTML
  private createForm() {
    this.form = this.formBuilder.group({
      $key: [this.contact.key],
      nomeProf: [this.contact.name, Validators.required],
      rgProf: [this.contact.rg, Validators.required],
      disciplinas: [this.contact.disciplinas, Validators.required],
      dataNascProf: [this.contact.dtNascimento, Validators.required],
      emailProf: [this.contact.email, Validators.required],
      senhaProf: [this.contact.senha, Validators.required],
      url: '',
    });

  }
 
  //FUNCAO PARA SALVAR OS DADOS
  private save() {
    //CHAMA UM SHOEDIALOG PARA MOSTRAR O CARREGAMENTO DO APP
    let loading: Loading = this.showLoading();
    //VARIAVEL QUE RECEBE O VALOR DO FORM
    let formUser = this.form.value

    //CHAMA A FUNÇÃO DE ATUALIZAR O USUARIO
    this.afAuth.createUser({
      email: formUser.emailProf,
      password: formUser.senhaProf
      //SE A ATUALIZAÇÂO DO USUARIO DEU CERTO ELE ATUALIZA OS OUTROS DADOS
    }).then((authUser: firebase.User) => {

      //PEGA O UID GERADO QUANDO FOI CRIADO O USUARIO
      let uuid: string = authUser.uid;
      //FAZ O UPLOAD DA FOTO    
      this.uploadPhoto(formUser, uuid); 
      //MENSAGEM DE CADASTRO COM SUCESSO 
      this.toastMenssager("Cadastro efetuado com sucesso"); 
      //TIRA O SHOWLOADING 
      loading.dismiss();    

    }).catch((error: any) => {
      //MOSTRA ERRO 
      this.cancelar(error);
      //TIRA O SHOWLOADING 
      loading.dismiss();
    });     
    
  }

  //FUNCAO QUE CHAMA O UPLOAD DA FOTO
  private uploadPhoto(item: User, uuid: string, ){
   
    let uploadTask;
    //CRIA UM OBJETO USUARIO E CARRREGA COM OS DADOS DO FORMULARIO
    let usuario = {
      nomeProf: item.nomeProf,
      dataNascProf: item.dataNascProf,
      rgProf: item.rgProf,
      emailProf: item.emailProf,
      senhaProf: item.senhaProf,
      disciplinas:item.disciplinas,
      url: '',
    }

    if(this.filePhoto != null){
      //CHAMA A FUNCAO DE UPLOAD DO PROVIDER PROFESSOR
       uploadTask = this.provider.uploadPhoto(this.filePhoto, uuid);
       uploadTask.then((UploadTaskSnapshot: firebase.storage.UploadTaskSnapshot) => {
        //RECEBE A URL DA IMAGEM QUE FOI SALVA NO FIREBASE
        usuario.url = uploadTask.snapshot.downloadURL;
        //CHAMA A FUNCAO QUE CRIA O USUARIO
        this.provider.create(usuario, uuid);
        //SALVA NO STORAGE O UID DO USUARIO COMO CHAVE E UM OBJETO USER COM OS DADOS VINDO DO FIREBASE
        this.storage.set(uuid,usuario);
        //CHAMA A TELA DE HOME DO APP
        this.navCtrl.setRoot(HomePage, {dados: usuario});
      });
    }else{
      //RECEBE A URL DA IMAGEM QUE FOI SALVA NO FIREBASE
      usuario.url = "https://firebasestorage.googleapis.com/v0/b/palmphone-ad0fb.appspot.com/o/fotoPerfilProfessor%2FvjJZVZPMYKhNDRQPuYI4RVsM6rv1.jpg?alt=media&token=a63c362b-a458-41b6-8d98-02a9a3deb093";
      //CHAMA A FUNCAO QUE CRIA O USUARIO
      this.provider.create(usuario, uuid);
      //SALVA NO STORAGE O UID DO USUARIO COMO CHAVE E UM OBJETO USER COM OS DADOS VINDO DO FIREBASE
      this.storage.set(uuid,usuario);
      //CHAMA A TELA DE HOME DO APP
      this.navCtrl.setRoot(HomePage, {dados: usuario});
    }
  }

  //PEGA A FOTO
  private onPhoto(event): void {  
    this.filePhoto = event.target.files[0];
  }

  //PARA CRIAR UM TOAST
  private toastMenssager(mensagen: string){
    //CRIA UM TOAST DE CONFIRMAÇÂO DE SINCRONIZACAO
    let toast = this.toastCtrl.create({ 
      duration: 5000, 
      position: 'bottom',
      message: mensagen  
    });
    toast.present();
  }

  //FUNCAO PARA CANCELAR A CHAMDA
  private cancelar(erro: string){
    let alert = this.alertCtrl.create({//ABRE O ALERTA PARA EXIBIR O DADO LIDO
      title: 'Alerta',
      message: erro ,  //EXIBE PARA O USUARIO O DADO
      buttons: [                                                   
        {
          text: 'OK',
          handler: () => {
           
          }
        }
      ]
    });
    //CHAMA O ALERTA PARA SER EXIBIDO
    alert.present();
  }

  //FUNÇÃO RESPONSAVEL PELA CRIAÇÂO DO SHOWLOADING
  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
  
    return loading;
  }

}
