import { User } from './../../model/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  //OBJETO DO USUARIO
  currentUser: User;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    
  ) 
  {
    //RECEBE COMO PARAMETRO O OBJETO ENVIADO PELA PAGINA DE HOME
    this.currentUser = navParams.get("dados");
  }

 }
