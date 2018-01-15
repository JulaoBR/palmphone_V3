import { Observable } from 'rxjs/Observable';
import { AlunoProvider } from './../../providers/aluno';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ListaAlunoPage } from '../lista-aluno/lista-aluno';

@IonicPage()
@Component({
  selector: 'page-cad-aluno',
  templateUrl: 'cad-aluno.html',
})
export class CadAlunoPage {

  form: FormGroup;
  contact: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder, 
    private provider: AlunoProvider,
    private toast: ToastController
  ) {

    // maneira 1
    this.contact = this.navParams.data.contact || { };
    this.createForm();
  }
  
  createForm() {
    this.form = this.formBuilder.group({
      key: [this.contact.key],
      name: [this.contact.name, Validators.required],
      ra: [this.contact.ra, Validators.required],
      dtNascimento: [this.contact.dtNascimento, Validators.required],
      email: [this.contact.email, Validators.required],
    });
  }
 
  onSubmit() {
    if (this.form.valid) {
      this.provider.save(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Contato salvo com sucesso.', duration: 3000 }).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao salvar o contato.', duration: 3000 }).present();
          console.error(e);
        })
    }
  }

  abrirListaAlunos(): void{
    this.navCtrl.push(ListaAlunoPage);
  }

}
