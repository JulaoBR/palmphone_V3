import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-leitor',
  templateUrl: 'leitor.html',
})
export class LeitorPage {
  results: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private barcode: BarcodeScanner,
    public alertCtrl: AlertController
  ) 
  {
  }

  scanBarcode(){
    this.results = {};

    const options = {
        prompt : "Leia o cracha"
    }
    this.barcode.scan(options).then((data) => {
      this.results = data;
      const alert = this.alertCtrl.create({
        title: 'RA:',
        subTitle: data.text,
        buttons: ['OK']
      });
      alert.present();
    })
    .catch((err) => {
      const alert = this.alertCtrl.create({
        title: 'Atenção!',
        subTitle: err,
        buttons: ['Fechar']
      });
      alert.present();
    });       
}   

}
