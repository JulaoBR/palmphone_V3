import { AuthProvider } from './../../providers/auth';
import { ProfessorProvider } from './../../providers/professor';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as firebase from 'firebase/app';
import { ListaProfessorPage } from '../lista-professor/lista-professor';

@IonicPage()
@Component({
  selector: 'page-cad-professor',
  templateUrl: 'cad-professor.html',
})
export class CadProfessorPage {

  title: string;
  form: FormGroup;
  contact: any;
  uploadProgress: number;
  private filePhoto: File;
 
  constructor(
    public afAuth: AuthProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder, 
    private provider: ProfessorProvider,
    private toast: ToastController
  ) {
 
    this.contact = this.navParams.data.contact || { };
    this.createForm();
  }

 
  //CRIA UM FORM COM OS DADOS RECOLHIDOS DO FORM HTML
  createForm() {
    this.form = this.formBuilder.group({
      key: [this.contact.key],
      name: [this.contact.name, Validators.required],
      cpf: [this.contact.cpf, Validators.required],
      dtNascimento: [this.contact.dtNascimento, Validators.required],
      email: [this.contact.email, Validators.required],
      senha: [this.contact.senha, Validators.required],
    });
  }
 
  onSubmit() {
    //VARIAVEL QUE RECEBE O VALOR DO FORM
    let formUser = this.form.value;

    //VERIFICA SE O FORM TEM DADOS VALIDOS
    if (this.form.valid) {
      
      //CHAMA A FUNÇÃO DE CRIAR UM NOVO USUARIO
      this.afAuth.createUser({
        email: formUser.email,
        password: formUser.senha
      }).then((authUser: firebase.User) => {
         
        //DELETA A SENHA DO FORM
        delete formUser.senha;
        //PEGA O UID DO USUARIO CRIADO
        let uuid: string = authUser.uid;
        //CHAMA A FUNÇÃO DE SALVAR OS DADOS DO PROFESSOR COM O UID CRIADO
        this.provider.save(formUser, uuid)
        .then(() => {          
          this.toast.create({ message: 'Contato salvo com sucesso.', duration: 3000 }).present();         
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao salvar o contato.', duration: 3000 }).present();
          console.error(e);
        })
        
      }).catch((error: any) => {
        //MOSTRA ERRO 
        console.log(error);
      });
    }
  }

  abrirListaProfessor(): void{
    this.navCtrl.push(ListaProfessorPage);
  }

}
