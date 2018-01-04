import { ProfessorProvider } from './../../providers/professor';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-lista-professor',
  templateUrl: 'lista-professor.html',
})
export class ListaProfessorPage {

  dados: Observable<any>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public provider: ProfessorProvider
  ) 
  {
    this.dados = provider.getAll();
  }


}
