import { DisciplinaProvider } from './../../providers/disciplina';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-cad-disciplina',
  templateUrl: 'cad-disciplina.html',
})
export class CadDisciplinaPage {

  dados: Observable<any>;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private provider: DisciplinaProvider

  ) 
  {
    this.dados = provider.getAll();
  }

  


}
