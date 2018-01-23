import { ColetorProvider } from './../../providers/coletor';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-leitor',
  templateUrl: 'leitor.html',
})
export class LeitorPage {
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private barcode: BarcodeScanner,
    public alertCtrl: AlertController,
    private provider: ColetorProvider
  ) 
  {
    
  }

  scanBarcode(){
    const options = {
        prompt : "Leia o cracha"
    }
    this.barcode.scan(options).then((data) => {
      
      if(data.text != ""){
        let alert = this.alertCtrl.create({
          title: 'Confirmação da leitura',
          message: 'Deseja salvar este RA: ' + data.text +' ?' ,
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => {
                console.log('evento cancelado');
              }
            },
            {
              text: 'Confirmar',
              handler: () => {
                this.provider.save(data.text);
                this.scanBarcode();
              }
            }
          ]
        });
        alert.present(); 
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
