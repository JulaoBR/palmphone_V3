import { User } from './../../model/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  ToastController } from 'ionic-angular';
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
    private toastCtrl: ToastController
  ) 
  {
    //CARREGA OS DADOS VINDO POR PARAMETRO DO USUARIO LOGADO
    this.currentUser = this.navParams.get("dados");
    //CARREGA AS DISCIPLINAS DO PROFESSOR
    this.disciplina = this.currentUser.disciplinas;
    console.log(this.disciplina);
  }

  //CHAMA A PAGINA DO LEITOR DO CODIGO DE BARRA
  private abrirLeitor(): void{
    //FAZ UMA VERIFICAÇÂO PARA ATIVAR O BOTAO, SE NAO FOR SELECIONADO NEM UMA DAS OPÇOES ELE NAO DEIXA ABRIR A PAGINA SOLICITADA
    if(this.disc != null && this.numAula != null){
      this.navCtrl.push(LeitorPage);
    }else if(this.disc == null){
      //CRIA UM TOAST PARA ALERTAR SOBRE A SELECAO DA DISCIPLINA
      let toast = this.toastCtrl.create({ 
        duration: 3000, 
        position: 'middle',
        message: 'Selecione a disciplina'  
      });
      toast.present();
    }else if(this.numAula == null){
      //CRIA UM TOAST PARA ALERTAR SOBRE A SELECAO DO NUMERO DE AULAS
      let toast = this.toastCtrl.create({ 
        duration: 3000, 
        position: 'middle',
        message: 'Selecione o numero de aulas'  
      });
      toast.present();
    }
  }
  
  //CARREGA OS DADOS DO CAMPO SELECIONADO
  private verificaNumAula(numAula){
    this.numAula = numAula;
  }

  //CARREGA OS DADOS DO CAMPO SELECIONADO
  private verificaDisci(disc){
    this.disc = disc;
  }

}
