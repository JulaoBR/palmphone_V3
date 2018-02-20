import { User } from './../model/user';
import { LoginPage } from './../pages/login/login';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any;
  currentUser: User;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    afAuth: AngularFireAuth,
  ) 
  {
    //FUNCAO PARA VERIFICAR SE JA ESTA LOGADO
    const authObserver = afAuth.authState.subscribe(user => {
      //SE EXISTIR UM USUARIO LOGADO ENTRA E CHAMA A PAGINA DE HOME
      if(user){
        this.rootPage = HomePage;
        authObserver.unsubscribe();
      }else{
        //SE NAO CHAMA A PAGINA DE LOGIN
        this.rootPage = LoginPage;
        authObserver.unsubscribe();
      }
    });
    
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

