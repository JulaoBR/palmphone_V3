import { ProfessorProvider } from './../../providers/professor';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from "rxjs/Observable";

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  dados: Observable<any>;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private provider: ProfessorProvider
  ) 
  {

    this.dados = this.provider.getAll();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

}
