import { User } from './../../model/user';
import { AuthProvider } from './../../providers/auth';
import { ProfessorProvider } from './../../providers/professor';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as firebase from 'firebase/app';
import { Toast } from 'ionic-angular/components/toast/toast';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-cad-professor',
  templateUrl: 'cad-professor.html',
})
export class CadProfessorPage {

  private form: FormGroup;
  private contact: any;
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
    private toastCtrl: ToastController
  ) 
  {
    //RECEBE OS DADOS DO FORMULARIO PARA EDIÇÂO
    this.contact = this.navParams.data.contact || { };
    //CRIA O FORMULARIO
    this.createForm();
    console.log(this.nomeDisciplinas);

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
  private onSubmit() {

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
       
        //delete formUser.password;
        //PEGA O UID GERADO QUANDO FOI CRIADO O USUARIO
        let uuid: string = authUser.uid;

        //CHAMA A FUNÇÃO DE SALVAR OS DADOS DO PROFESSOR COM O UID CRIADO
        this.provider.create(uuid, formUser)
        .then(() => {        
          this.navCtrl.setRoot(HomePage);
          //CRIA UM TOAST DE CONFIRMAÇÂO DE SINCRONIZACAO
          let toast = this.toastCtrl.create({ 
            duration: 3000, 
            position: 'bottom',
            message: 'Usuario salvo com sucesso!'  
          });
          toast.present();         
        })
        .catch((e) => {
          //CRIA UM TOAST DE CONFIRMAÇÂO DE SINCRONIZACAO
          let toast = this.toastCtrl.create({ 
            duration: 3000, 
            position: 'bottom',
            message: 'Erro ao salvar o usuario!'  
          });
          toast.present();
          console.error(e);
        })
        
      }).catch((error: any) => {
        //MOSTRA ERRO 
        console.log(error);
      });
    }
  }



}
