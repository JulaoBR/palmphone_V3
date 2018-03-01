import { User } from './../../model/user';
import { AuthProvider } from './../../providers/auth';
import { ProfessorProvider } from './../../providers/professor';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImagePicker } from '@ionic-native/image-picker';
import { Toast } from 'ionic-angular/components/toast/toast';
import { HomePage } from '../home/home';

import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-cad-professor',
  templateUrl: 'cad-professor.html',
})
export class CadProfessorPage {

  private form: FormGroup;
  private contact: any;
  private imgPath: string;
  private fileToUpload: any;
  private nomeDisciplinas=[
    {
      "dscDisc": "SIF038 - Redes de Computadores I"
    },
    {
      "dscDisc": "SIF043 - Gerência de Projetos"
    }        
  ]
     
  constructor(
    public afAuth: AuthProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder, 
    private provider: ProfessorProvider,
    private toastCtrl: ToastController,
    private imagePicker: ImagePicker
  ) 
  {
    //RECEBE OS DADOS DO FORMULARIO PARA EDIÇÂO
    this.contact = this.navParams.data.contact || { };
    //CRIA O FORMULARIO
    this.createForm();
    this.imgPath = "/assets/imgs/imgPerfil.jpg";
    this.fileToUpload = "/assets/imgs/imgPerfil.jpg";

  }

 
  //CRIA UM FORM COM OS DADOS RECOLHIDOS DO FORM HTML
  private createForm() {
    this.form = this.formBuilder.group({
      key: [this.contact.key],
      nomeProf: [this.contact.name, Validators.required],
      rgProf: [this.contact.rg, Validators.required],
      disciplinas: [this.contact.disciplinas, Validators.required],
      dataNascProf: [this.contact.dtNascimento, Validators.required],
      emailProf: [this.contact.email, Validators.required],
      senhaProf: [this.contact.senha, Validators.required],
    });
  }
 
  //FUNCAO PARA SALVAR OS DADOS
  private save() {

    //VARIAVEL QUE RECEBE O VALOR DO FORM
    let formUser = this.form.value;

    //VERIFICA SE O FORM TEM DADOS VALIDOS
    if (this.form.valid) {
      
      //CHAMA A FUNÇÃO DE ATUALIZAR O USUARIO
      this.afAuth.createUser({
        email: formUser.emailProf,
        password: formUser.senhaProf
        //SE A ATUALIZAÇÂO DO USUARIO DEU CERTO ELE ATUALIZA OS OUTROS DADOS
      }).then((authUser: firebase.User) => {
        //PEGA O UID GERADO QUANDO FOI CRIADO O USUARIO
        let uuid: string = authUser.uid;

        //CHAMA A FUNÇÃO DE SALVAR OS DADOS DO PROFESSOR COM O UID CRIADO
        this.provider.uploadAndSave(formUser, this.fileToUpload, uuid)
             
      }).catch((error: any) => {
        //MOSTRA ERRO 
        console.log(error);
      });
    }
  }

  escolherFoto() {
    this.imagePicker.hasReadPermission()
      .then(hasPermission => {
        if (hasPermission) {
          this.pegarImagem();
        } else {
          this.solicitarPermissao();
        }
      }).catch(error => {
        console.error('Erro ao verificar permissão', error);
      });
  }

  solicitarPermissao() {
    this.imagePicker.requestReadPermission()
      .then(hasPermission => {
        if (hasPermission) {
          this.pegarImagem();
        } else {
          console.error('Permissão negada');
        }
      }).catch(error => {
        console.error('Erro ao solicitar permissão', error);
      });
  }

  pegarImagem() {
    this.imagePicker.getPictures({
      maximumImagesCount: 1, //Apenas uma imagem
      outputType: 1 //BASE 64
    })
      .then(results => {
        if (results.length > 0) {
          this.imgPath = 'data:image/png;base64,' + results[0];
          this.fileToUpload = results[0];
        } else {
          this.imgPath = '';
          this.fileToUpload = null;
        }
      })
      .catch(error => {
        console.error('Erro ao recuperar a imagem', error);
      });
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
