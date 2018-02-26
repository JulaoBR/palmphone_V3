import { User } from './../../model/user';
import { AuthProvider } from './../../providers/auth';
import { ProfessorProvider } from './../../providers/professor';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as firebase from 'firebase/app';
import { Toast } from 'ionic-angular/components/toast/toast';

@IonicPage()
@Component({
  selector: 'page-cad-professor',
  templateUrl: 'cad-professor.html',
})
export class CadProfessorPage {

  private form: FormGroup;
  private contact: any;
  private dados: User;
 
  constructor(
    public afAuth: AuthProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder, 
    private provider: ProfessorProvider,
    private toastCtrl: ToastController
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
      emailProf: [this.contact.email, Validators.required],
      senhaProf: [this.contact.senha, Validators.required],
    });
  }
 
  //FUNCAO PARA SALVAR OS DADOS
  private onSubmit() {


    //VERIFICA SE O FORM TEM DADOS VALIDOS
    if (this.form.valid) {   
      //PEGA O UID DO USUARIO LOGADO
      var key = firebase.auth().currentUser.uid;

      //CHAMA A FUNÇÃO DE SALVAR OS DADOS DO PROFESSOR COM O UID CRIADO
      this.provider.update(key, this.form.value)
      .then(() => {          
        //CRIA UM TOAST PARA ALERTAR SOBRE O SUCESSO DO SALVAMENTO DOS DADOS
        let toast = this.toastCtrl.create({ 
          duration: 3000, 
          position: 'middle',
          message: 'Dados salvos com sucesso!'  
        });
        toast.present();    
      })
      .catch((e) => {
        //CRIA UM TOAST PARA ALERTAR SOBRE O ERRO AO SALVAR OS DADOS
        let toast = this.toastCtrl.create({ 
          duration: 3000, 
          position: 'middle',
          message: 'Erro ao salvar os dados:' + e  
        });
        toast.present(); 
      })
    }
  }

}
