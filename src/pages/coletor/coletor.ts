import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LeitorPage } from '../leitor/leitor';

@IonicPage()
@Component({
  selector: 'page-coletor',
  templateUrl: 'coletor.html',
})
export class ColetorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ColetorPage');
  }

  abrirLeitor(): void{
    this.navCtrl.push(LeitorPage);
  }
}
