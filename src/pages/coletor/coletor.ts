import { User } from './../../model/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LeitorPage } from '../leitor/leitor';

@IonicPage()
@Component({
  selector: 'page-coletor',
  templateUrl: 'coletor.html',
})
export class ColetorPage {

  //VARIAVEIS PARA O CONTROLE DO BOTAO
  private disc: string;
  private numAula: string;
  //==================================

  //VARIAVEL PARA OS DADOS DO USUARIO
  currentUser: User;
  //VARIAVEL PARA AS DISCIPLINAS
  disciplina: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController
  ) 
  {
    //CARREGA OS DADOS VINDO POR PARAMETRO DO USUARIO LOGADO
    this.currentUser = this.navParams.get("dados");
    //CARREGA AS DISCIPLINAS DO PROFESSOR
    this.disciplina = this.currentUser.disciplinas;
  }

  //CHAMA A PAGINA DO LEITOR DO CODIGO DE BARRA
  abrirLeitor(): void{
    //FAZ UMA VERIFICAÇÂO PARA ATIVAR O BOTAO, SE NAO FOR SELECIONADO NEM UMA DAS OPÇOES ELE NAO DEIXA ABRIR A PAGINA SOLICITADA
    if(this.disc != null && this.numAula != null){
      this.navCtrl.push(LeitorPage);
    }else{
      //CRIA O ALERTA
      let alert = this.alertCtrl.create({
        title: 'Atenção',
        subTitle: 'Selecione as opções para continuar a operação!',
        buttons: ['Ok']
      });
      alert.present();
    }
  }
  
  //CARREGA OS DADOS DO CAMPO SELECIONADO
  verificaNumAula(numAula){
    this.numAula = numAula;
  }

  //CARREGA OS DADOS DO CAMPO SELECIONADO
  verificaDisci(disc){
    this.disc = disc;
  }

}
