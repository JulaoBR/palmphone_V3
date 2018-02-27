import { User } from './../../model/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EdiProfessorPage } from '../edi-professor/edi-professor';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  //OBJETO DO USUARIO LOGADO
  currentUser: User;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams    
  ) 
  {
    //RECEBE DADOS POR PARAMETRO DA TELA DE HOME
    this.currentUser = this.navParams.get("dados");
  }

  
  //MANDA OS DADOS PARA A PAGINA DE EDIÇÂO
  editarProfessor(): void {
    this.navCtrl.push(EdiProfessorPage, {dados: this.currentUser});
  }

 }
