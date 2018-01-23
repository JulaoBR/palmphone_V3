import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { Coleta } from '../../model/coleta';

@IonicPage()
@Component({
  selector: 'page-leitor',
  templateUrl: 'leitor.html',
})
export class LeitorPage {
  
  coletor: Coleta;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private barcode: BarcodeScanner,
    public alertCtrl: AlertController
  ) 
  {
  }

  scanBarcode(){
    
    var i = 0;
    const options = {
        prompt : "Leia o cracha"
    }
    this.barcode.scan(options).then((data) => {      
      const alert = this.alertCtrl.create({
        title: 'RA:',
        subTitle: data.text,
        buttons: ['OK']
      });
      if(data != null){
        alert.present();
        this.coletor = {
          contador: '17/01/18',
          ra: data.text
        }


      }
      
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
