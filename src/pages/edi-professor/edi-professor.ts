import { User } from './../../model/user';
import { AuthProvider } from './../../providers/auth';
import { ProfessorProvider } from './../../providers/professor';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-edi-professor',
  templateUrl: 'edi-professor.html',
})
export class EdiProfessorPage {

  private filePhoto: File;
  private form: FormGroup;
  private contact: any;
  private dados: User;
 
  constructor(
    public afAuth: AuthProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder, 
    private provider: ProfessorProvider,
    private toastCtrl: ToastController,
    private storage: Storage,
  ) 
  {
    //CARREGA OS DADOS VINDO POR PARAMETRO DA TELA DE PERFIL
    this.dados = this.navParams.get("dados");
    //RECEBE OS DADOS DO FORMULARIO PARA EDIÇÂO
    this.contact = this.navParams.data.contact || { };
    //CRIA O FORMULARIO
    this.createForm();
  }

 
  //CRIA UM FORM COM OS DADOS RECOLHIDOS DO FORM HTML
  private createForm() {
    this.form = this.formBuilder.group({
      key: [this.contact.key],
      nomeProf: [this.contact.name, Validators.required],
      rgProf: [this.contact.rg, Validators.required],
      dataNascProf: [this.contact.dtNascimento, Validators.required],
    });
  }
 
  //FUNCAO PARA SALVAR OS DADOS
  private save() {

    //VARIAVEL QUE RECEBE O VALOR DO FORM
    let formUser = this.form.value

    //VERIFICA SE O FORM TEM DADOS VALIDOS
    if (this.filePhoto) { 
  
      //PEGA O UID GERADO QUANDO FOI CRIADO O USUARIO
      var uuid = firebase.auth().currentUser.uid; 
      this.uploadPhoto(formUser, uuid);               
                              
    }else{
      this.toastMenssager('Selecione uma foto!'); 
    }
  }

  //FUNCAO QUE CHAMA O UPLOAD DA FOTO
  private uploadPhoto(item: User, uuid: string, ){
    //CRIA UM OBJETO USUARIO E CARRREGA COM OS DADOS DO FORMULARIO
    let usuario = {
      nomeProf: item.nomeProf,
      dataNascProf: item.dataNascProf,
      rgProf: item.rgProf,
      emailProf: this.dados.emailProf,
      senhaProf: this.dados.senhaProf,
      disciplinas:[
        {dscDisc: this.dados.disciplinas}
      ],
      url: '',
    }
    //CHAMA A FUNCAO DE UPLOAD DO PROVIDER PROFESSOR
    let uploadTask = this.provider.uploadPhoto(this.filePhoto, uuid);
    
    uploadTask.then((UploadTaskSnapshot: firebase.storage.UploadTaskSnapshot) => {
      //RECEBE A URL DA IMAGEM QUE FOI SALVA NO FIREBASE
      usuario.url = uploadTask.snapshot.downloadURL;
      //CHAMA A FUNCAO QUE CRIA O USUARIO
      this.provider.update(usuario, uuid);
      //SALVA NO STORAGE O UID DO USUARIO COMO CHAVE E UM OBJETO USER COM OS DADOS VINDO DO FIREBASE
      this.storage.set(uuid,usuario);
      //CHAMA A TELA DE HOME DO APP
    });
  }

  //PEGA A FOTO
  private onPhoto(event): void {  
    this.filePhoto = event.target.files[0];
  }

  //PARA CRIAR UM TOAST
  private toastMenssager(mensagen: string){
    //CRIA UM TOAST DE CONFIRMAÇÂO DE SINCRONIZACAO
    let toast = this.toastCtrl.create({ 
      duration: 3000, 
      position: 'bottom',
      message: mensagen  
    });
    toast.present();
  }

}
