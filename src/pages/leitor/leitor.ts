import { Coleta } from './../../model/coleta';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ColetorProvider } from './../../providers/coletor';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { Coleta } from '../../model/coleta';
import { DatePipe } from '@angular/common';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-leitor',
  templateUrl: 'leitor.html',
})
export class LeitorPage {
  
  form: FormGroup;
  dados: any;
  lista: Array<Coleta> = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private barcode: BarcodeScanner,
    public alertCtrl: AlertController,
    private provider: ColetorProvider,
    private formBuilder: FormBuilder,
    private toast: ToastController,
    private datepipe: DatePipe,
    private storage: Storage
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


  saveStorage(dataAtual: string){  
    
    //SALVA NO STORAGE O UID DO USUARIO COMO CHAVE E UM OBJETO USER COM OS DADOS VINDO DO FIREBASE
    this.storage.set(dataAtual,this.lista);   
  }

  saveManual(){

    //FORMATA DATA ATUAL
    let dataAtual = this.datepipe.transform(new Date(), "ddMMyyyyHHmmss");

    var chamada: Coleta;

    if (this.form.valid) {
     
      this.lista.push(chamada);

      this.saveStorage(dataAtual);
    }
  }

  scanBarcode(){
    //CONFIGURA AS OPÇõES DO LEITOR
    const options = {
      //OQUE VAI SER EXIBIDO QUANDO EFETUAR A LEITURA
        prompt : "Leia o cracha"
    }
    //FUNCAO QUE LE OS DADOS
    this.barcode.scan(options).then((data) => {      
      if(data.text != ""){ //SE DATA FOR DIFERENTE DE NULO ELE ENTRA E FAZ OS PROCEDIMENTOS
        let alert = this.alertCtrl.create({//ABRE O ALERTA PARA EXIBIR O DADO LIDO
          title: 'Confirmação da leitura',
          message: 'Deseja salvar este RA: ' + data.text +' ?' ,  //EXIBE PARA O USUARIO O DADO
          buttons: [                                              //E PERGUNTA SE DESEJA SALVAR
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
                //SE O USUARIO CLICO NO BOTAO PARA SALVAR ELE CHAMA ESSE METODO QUE SALVARA OS DADOS NO FIREBASE
                this.provider.saveScan(data.text);
                //CHAMA O LEITOR DE NOVO
                this.scanBarcode();
              }
            }
          ]
        });
        //CHAMA O ALERTA PARA SER EXIBIDO
        alert.present(); 
      }      
    })
    //TRABAMENTO DE ERRO
    .catch((err) => {
      //CRIA UM ALERTA E EXIBE A MENSAGEM DE ERRO
      const alert = this.alertCtrl.create({
        title: 'Atenção!',
        subTitle: err,
        buttons: ['Fechar']
      });
      alert.present();
    });       
}   



}
