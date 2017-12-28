import { FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-cad-aluno',
  templateUrl: 'cad-aluno.html',
})
export class CadAlunoPage {

  title: string;
  form: FormGroup;
  contact: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
  }

}
