import { User } from './../../model/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LeitorPage } from '../leitor/leitor';

@IonicPage()
@Component({
  selector: 'page-coletor',
  templateUrl: 'coletor.html',
})
export class ColetorPage {

  //VARIAVEL PARA OS DADOS DO USUARIO
  currentUser: User;
  //VARIAVEL PARA AS DISCIPLINAS
  disciplina: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
  ) 
  {
    //CARREGA OS DADOS VINDO POR PARAMETRO DO USUARIO LOGADO
    this.currentUser = this.navParams.get("dados");
    //CARREGA AS DISCIPLINAS DO PROFESSOR
    this.disciplina = this.currentUser.disciplinas;
  }

  //CHAMA A PAGINA DO LEITOR DO CODIGO DE BARRA
  abrirLeitor(): void{
    this.navCtrl.push(LeitorPage);
  }
}
