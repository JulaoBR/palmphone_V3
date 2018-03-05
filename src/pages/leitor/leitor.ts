import { ColetorPage } from './../coletor/coletor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController,Platform } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { DatePipe } from '@angular/common';
import { Storage } from '@ionic/storage';
import { Dialogs } from '@ionic-native/dialogs';

@IonicPage()
@Component({
  selector: 'page-leitor',
  templateUrl: 'leitor.html',
})
export class LeitorPage {
  
  private form: FormGroup;
  private dados: any;
  private lista: Array<Object> = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private barcode: BarcodeScanner,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private datepipe: DatePipe,
    private storage: Storage,
    private platform: Platform,
    private dialogs: Dialogs
  ) 
  { 
    //RESPONSAVEL POR TRAZER OS DADOS DO FORMULARIO HTML
    this.dados = this.navParams.data.dados || { };
    //CRIA UM OBJETO DO TIPO FORM
    this.createForm();
  }

  //CRIA O FORMULARIO COM OS DADOS VINDO DA TELA QUANDO USAR O MODO MANUAL
  private createForm() {
    //FORMATA DATA ATUAL
    let dataAtual = this.datepipe.transform(new Date(), "dd/MM/yyyy/-HH-mm-ss");
    this.form = this.formBuilder.group({    
      ra: ['', [Validators.required]],  //RA DIGITADO PELO USUARIO
      data: dataAtual       //DATA QUE FOI FEITO A DIGITAÇÃO  
    });
  }

  //VAI FINALIZAR A CHAMADA SALVANDO OS DADOS DA LISTA NO STORAGE
  private saveStorage(){ 
    if(this.verificaListaEstaVazia()){
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
              //FORMATA DATA ATUAL, QUE SERA A CHAVE PRIMARIA 
              let dataAtual = this.datepipe.transform(new Date(), "ddMMyyyyHHmmss");
              //SALVA NO STORAGE O UID DO USUARIO COMO CHAVE E UM OBJETO USER COM OS DADOS VINDO DO FIREBASE
              this.storage.set(dataAtual,this.lista); 
              //CAHAMA O TOAST DE CONFIRMACAO 
              this.toastMenssager('Chamada finalizada');
              //VOLTA PARA A TELA ANTERIOR
              this.navCtrl.pop();   
            }
          }
        ]
      })
      //CHAMA O ALERTA PARA SER EXIBIDO
      alert.present();  
    }              
  }

  //FUNCAO PARA SALVAR OS DADO DIGITADOS PELO USUARIO NA LISTA
  private saveManual(){ 
    //SE O FORMULARIO FOR VALIDO
    if (this.form.valid) {
      let alert = this.alertCtrl.create({//ABRE O ALERTA PARA EXIBIR O DADO LIDO
        title: 'Confirmação da leitura',
        message: 'Deseja salvar este RA: ' + this.form.value.ra +' ?' ,   //EXIBE PARA O USUARIO O DADO
        buttons: [                                                        //E PERGUNTA SE DESEJA SALVAR
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
              //PREENCHE A LISTA COM OS DADOS
              this.lista.push(this.form.value);
              //CHAMA UM ALERTA SONORO QUANDO SALVA MANUAL
              this.dialogs.beep(1);
              //LIMPA FORMULARIO
              this.createForm();
              //CAHAMA O TOAST DE CONFIRMACAO 
              this.toastMenssager('RA Salvo');
            }
          }
        ]
      });
      //CHAMA O ALERTA PARA SER EXIBIDO
      alert.present();
    }
  }

  //FUNCAO DO LEITOR DE CODIGO DE BARRA
  private scanBarcode(){
    //CONFIGURA AS OPÇõES DO LEITOR
    const options = {
      //OQUE VAI SER EXIBIDO QUANDO EFETUAR A LEITURA
      prompt : "Leia o cracha",
      //CONFIGURAÇÂO DO BEEP DO LEITOR
      disableSuccessBeep: false,
    }
    
    //FUNCAO QUE LE OS DADOS
    this.barcode.scan(options).then((valor) => {      
      //if(valor.text != ""){ //SE DATA FOR DIFERENTE DE NULO ELE ENTRA E FAZ OS PROCEDIMENTOS
        let alert = this.alertCtrl.create({//ABRE O ALERTA PARA EXIBIR O DADO LIDO
          title: 'Confirmação da leitura',
          message: 'Deseja salvar este RA: ' + valor.text +' ?' ,  //EXIBE PARA O USUARIO O DADO
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
                let data = this.datepipe.transform(new Date(), "dd/MM/yyyy/-HH-mm-ss");
                //ADICIONA O TEXTO PEGO DO SCAN E JOGA NA VARIAVEL RA
                var ra = valor.text
                //SALVA OS DADOS NA LISTA/
                this.lista.push({ra,data});
                //CAHAMA O TOAST DE CONFIRMACAO 
                this.toastMenssager('RA Salvo');
                this.scanBarcode();
              }
            }
          ]
        });
        //CHAMA O ALERTA PARA SER EXIBIDO
        alert.present(); 
          
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

  //FUNCAO PARA VERIFICAR SE A LISTA ESTA VAZIA 
  private verificaListaEstaVazia() : boolean{
    //CASO A LISTA SEJA MENOR OU IGUALA 0 CRIA UM ALERTA
    if(this.lista.length <= 0){
      let alert = this.alertCtrl.create({
        title: 'Atenção',
        subTitle: 'Sem dados para finalizar a chamada!!',
        buttons: ['Ok']
      });
      alert.present();
      return false;
    }else{
      return true;
    }
  } 

  //FUNCAO PARA CANCELAR A CHAMDA
  private cancelar(){
    let alert = this.alertCtrl.create({//ABRE O ALERTA PARA EXIBIR O DADO LIDO
      title: 'Cancelamento',
      message: 'Deseja cancelar a chamada e voltar a pagina anterior?' ,  //EXIBE PARA O USUARIO O DADO
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
            this.navCtrl.pop();
          }
        }
      ]
    });
    //CHAMA O ALERTA PARA SER EXIBIDO
    alert.present();
  }

     //PARA CRIAR UM TOAST
     private toastMenssager(mensagen: string){
      //CRIA UM TOAST DE CONFIRMAÇÂO DE SINCRONIZACAO
      let toast = this.toastCtrl.create({ 
        duration: 3000, 
        position: 'bottom',
        message: mensagen  
      });
      toast.present();
    }
}
