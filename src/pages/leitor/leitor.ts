import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ColetorProvider } from './../../providers/coletor';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { Coleta } from '../../model/coleta';
import { DatePipe } from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-leitor',
  templateUrl: 'leitor.html',
})
export class LeitorPage {
  
  form: FormGroup;
  dados: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private barcode: BarcodeScanner,
    public alertCtrl: AlertController,
    private provider: ColetorProvider,
    private formBuilder: FormBuilder,
    private toast: ToastController,
    private datepipe: DatePipe
  ) 
  {
    this.dados = this.navParams.data.dados || { };
    this.createForm();
  }

  //CRIA O FORMULARIO COM OS DADOS VINDO DA TELA 
  createForm() {
    this.form = this.formBuilder.group({    
      ra: [this.dados.ra],       
    });
  }

  saveManual(){

    //FORMATA DATA ATUAL
    let dataAtual = this.datepipe.transform(new Date(), "ddMMyyyyHHmmss");

    if (this.form.valid) {
      this.provider.saveManual(this.form.value)
        .then(() => {
          this.toast.create({ message: 'RA salvo com sucesso.', duration: 3000 }).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao salvar o RA.', duration: 3000 }).present();
          console.error(e);
        })
    }
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
                this.provider.saveScan(data.text);
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
