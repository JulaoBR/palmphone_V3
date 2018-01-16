import { LoginPage } from './../login/login';
import { CadastrosPage } from './../cadastros/cadastros';
import { ColetorPage } from './../coletor/coletor';
import { PerfilPage } from './../perfil/perfil';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private afAuth: AuthProvider
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
    this.afAuth.logoutUser()
      .then(() => {
        this.navCtrl.setRoot(LoginPage);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
