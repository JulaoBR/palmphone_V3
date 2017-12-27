import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-coletor-manual',
  templateUrl: 'coletor-manual.html',
})
export class ColetorManualPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) 
  {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ColetorManualPage');
  }

  //leitor de codigo de barras / camera do celular
  async scanBarcode(){
    
  }

}
