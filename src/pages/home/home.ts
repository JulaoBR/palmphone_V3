import { CadastrosPage } from './../cadastros/cadastros';
import { ColetorPage } from './../coletor/coletor';
import { PerfilPage } from './../perfil/perfil';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController
  ) 
  {

  }

  abrirTelaPerfil(){
    this.navCtrl.push(PerfilPage);
  }

  abrirTelaColeta(): void{
    this.navCtrl.push(ColetorPage);
  }

  abrirTelaCadastro(): void{
    this.navCtrl.push(CadastrosPage);
  }

  //FUNCAO PARA DESLOGAR
  singnOut(){
    
  }
}
