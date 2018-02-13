import { User } from './../../model/user';
import { ProfessorProvider } from './../../providers/professor';
import { LoginPage } from './../login/login';
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

  //OBJETO DO USUARIO LOGADO
  currentUser:  User;

  constructor(
    public navCtrl: NavController,
    private afAuth: AuthProvider,
    private provider: ProfessorProvider
  ) 
  {  
    //BUSCA O OBJETO DO USUARIO QUE ESTA LOGADO 
    const subscribe = this.provider.get().subscribe((c: User) => {
      subscribe.unsubscribe();
      //CARREGA O CURRENTUSER COM OS DADOS VINDO DO FIREBASE
      this.currentUser = c  
    })
  }

  abrirTelaPerfil(){
    //CHAMA A TELA DE PERFIL DO USUARIO E PASSA COMO PARAMETRO O OBJETO 
    this.navCtrl.push(PerfilPage, {dados : this.currentUser});
  }

  //CHAMA A TELA DE COLETA
  abrirTelaColeta(): void{
    this.navCtrl.push(ColetorPage);
  }


  //FUNCAO PARA DESLOGAR
  singnOut(){
    this.afAuth.logoutUser()
      .then(() => {
        //RETORNA PARA A PAGINA DE LOGIN E APAGA OS DADOS SALVOS
        this.navCtrl.setRoot(LoginPage);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
