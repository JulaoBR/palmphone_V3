import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CadProfessorPage } from '../cad-professor/cad-professor';
import { CadDisciplinaPage } from '../cad-disciplina/cad-disciplina';
import { CadAlunoPage } from '../cad-aluno/cad-aluno';

@IonicPage()
@Component({
  selector: 'page-cadastros',
  templateUrl: 'cadastros.html',
})
export class CadastrosPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) 
  {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastrosPage');
  }

  cadProfessor(): void{
    this.navCtrl.push(CadProfessorPage);
  }

  cadDisciplina(): void{
    this.navCtrl.push(CadDisciplinaPage);
  }

  cadAlunos(): void{
    this.navCtrl.push(CadAlunoPage);
  }
}
