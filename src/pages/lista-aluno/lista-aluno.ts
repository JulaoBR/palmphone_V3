import { AlunoProvider } from './../../providers/aluno';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-lista-aluno',
  templateUrl: 'lista-aluno.html',
})
export class ListaAlunoPage {

  dados: Observable<any>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public provider: AlunoProvider
  ) 
  {
    this.dados = provider.getAll();
  }

}
