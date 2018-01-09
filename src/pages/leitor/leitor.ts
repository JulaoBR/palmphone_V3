import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-leitor',
  templateUrl: 'leitor.html',
})
export class LeitorPage {
  results: {};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private barcode: BarcodeScanner
  ) 
  {
  }

  async scanBarcode(){
    this.results = await this.barcode.scan();
  }

}
