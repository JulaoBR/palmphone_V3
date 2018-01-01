import { User } from './../../model/user';
import { AuthProvider } from './../../providers/auth';
import { ProfessorProvider } from './../../providers/professor';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-cad-professor',
  templateUrl: 'cad-professor.html',
})
export class CadProfessorPage {

  title: string;
  form: FormGroup;
  contact: any;
 
  constructor(
    public afAuth: AuthProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder, 
    private provider: ProfessorProvider,
    private toast: ToastController
  ) {
 
    // maneira 1
    this.contact = this.navParams.data.contact || { };
    this.createForm();
    this.setupPageTitle();
  }
 
  private setupPageTitle() {
    this.title = this.navParams.data.contact ? 'Alterando contato' : 'Novo contato';
  }
 
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

      let formUser = this.form.value;

      if (this.form.valid) {
        
        this.afAuth.createUser({
          email: formUser.email,
          password: formUser.senha
        }).then((authUser: firebase.User) => {
          
          delete formUser.senha;
          let uuid: string = authUser.uid;
                                    
          this.provider.save(formUser, uuid)
          .then(() => {
            this.toast.create({ message: 'Contato salvo com sucesso.', duration: 3000 }).present();
            this.navCtrl.pop();
          })
          .catch((e) => {
            this.toast.create({ message: 'Erro ao salvar o contato.', duration: 3000 }).present();
            console.error(e);
          })
      }).catch((error: any) => {
        console.log(error);
        
      });
    }

  }
}
