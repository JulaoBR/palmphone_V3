import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-lista-aluno',
  templateUrl: 'lista-aluno.html',
})
export class ListaAlunoPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) 
  {
  }

}
