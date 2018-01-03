import { User } from './../model/user';
import { ProfessorProvider } from './../providers/professor';
import { LoginPage } from './../pages/login/login';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth';

import * as firebase from 'firebase/app';

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
    authService: AuthProvider,
    userService: ProfessorProvider
  ) 
  {
    authService.afAuth.authState.subscribe((authUser: firebase.User) => {

        if (authUser) {

          this.rootPage = HomePage;

          userService.currentUser.valueChanges().subscribe((user: User) => {
              this.currentUser = user;
            });

        } else {

          this.rootPage = LoginPage;

        }

      });
    
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

