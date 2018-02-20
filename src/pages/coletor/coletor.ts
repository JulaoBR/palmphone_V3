import { User } from './../../model/user';
import { ProfessorProvider } from './../../providers/professor';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LeitorPage } from '../leitor/leitor';

@IonicPage()
@Component({
  selector: 'page-coletor',
  templateUrl: 'coletor.html',
})
export class ColetorPage {

  currentUser: User;
  disciplina: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private provider: ProfessorProvider
  ) 
  {
    this.currentUser = this.navParams.get("dados");
    this.disciplina = this.currentUser.disciplinas;

    console.log(this.disciplina);
  }

  abrirLeitor(): void{
    this.navCtrl.push(LeitorPage);
  }
}
