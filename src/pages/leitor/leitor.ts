import { FormGroup, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
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
  lista: Array<any> = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private barcode: BarcodeScanner,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private datepipe: DatePipe,
    private storage: Storage
  ) 
  {
    //RESPONSAVEL POR TRAZER OS DADOS DO FORMULARIO HTML
    this.dados = this.navParams.data.dados || { };
    //CRIA UM OBJETO DO TIPO FORM
    this.createForm();
  }

  //CRIA O FORMULARIO COM OS DADOS VINDO DA TELA QUANDO USAR O MODO MANUAL
  createForm() {
    //FORMATA DATA ATUAL
    let dataAtual = this.datepipe.transform(new Date(), "dd/MM/yyyy/-HH-mm-ss");
    this.form = this.formBuilder.group({    
      ra: [this.dados.ra],  //RA DIGITADO PELO USUARIO
      data: dataAtual       //DATA QUE FOI FEITO A DIGITAÇÃO  
    });
  }

  //VAI FINALIZAR A CHAMADA SALVANDO OS DADOS DA LISTA NO STORAGE
  saveStorage(){  
    let alert = this.alertCtrl.create({//ABRE O ALERTA PARA CONFIRMAR SE DEJESA FINALIZAR A CHAMADA
      title: 'Confirmação',
      message: 'Deseja finalizar a chamada?' , 
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
            let toast = this.toastCtrl.create({
               duration: 3000, 
               position: 'bottom',
               message: 'Chamada finalizada'
            });

            //FORMATA DATA ATUAL, QUE SERA A CHAVE PRIMARIA 
            let dataAtual = this.datepipe.transform(new Date(), "ddMMyyyyHHmmss");
            //SALVA NO STORAGE O UID DO USUARIO COMO CHAVE E UM OBJETO USER COM OS DADOS VINDO DO FIREBASE
            this.storage.set(dataAtual,this.lista); 
            toast.present();   
          }
        }
      ]
    })
    //CHAMA O ALERTA PARA SER EXIBIDO
    alert.present();          
}

  //FUNCAO PARA SALVAR OS DADO DIGITADOS PELO USUARIO NA LISTA
  saveManual(){
    //SE O FORMULARIO FOR VALIDO
    if (this.form.valid) {
      //PREENCHE A LISTA COM OS DADOS
      this.lista.push(this.form.value);
    }
    // OBS FAZER UM TRATAMENTO CASO O FORMULARIO ESTIVER VAZIO
  }

  //FUNCAO DO LEITOR DE CODIGO DE BARRA
  scanBarcode(){
    //CONFIGURA AS OPÇõES DO LEITOR
    const options = {
      //OQUE VAI SER EXIBIDO QUANDO EFETUAR A LEITURA
      prompt : "Leia o cracha",
      //CONFIGURAÇÂO DO BEEP DO LEITOR
      disableSuccessBeep: false
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
                //FORMATA DATA ATUAL
                let dataAtual = this.datepipe.transform(new Date(), "dd/MM/yyyy/-HH-mm-ss");

                //SALVA OS DADOS NA LISTA/
                this.lista.push(data.text, dataAtual);
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
