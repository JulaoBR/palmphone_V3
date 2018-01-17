import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ListaProfessorPage } from './../pages/lista-professor/lista-professor';
import { LeitorPage } from './../pages/leitor/leitor';
import { CadastrosPage } from './../pages/cadastros/cadastros';
import { CadProfessorPage } from './../pages/cad-professor/cad-professor';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CadDisciplinaPage } from '../pages/cad-disciplina/cad-disciplina';
import { ColetorPage } from '../pages/coletor/coletor';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from '../pages/perfil/perfil';
import { AuthProvider } from '../providers/auth';

import { FIREBASE_CONFIG } from './app.firebase.config';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ProfessorProvider } from '../providers/professor';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { BaseProvider } from '../providers/base';
import { DisciplinaProvider } from '../providers/disciplina';
import { ColetorProvider } from '../providers/coletor';

@NgModule({
  declarations: [
    CadDisciplinaPage,
    CadProfessorPage,
    CadastrosPage,
    ColetorPage,
    MyApp,
    HomePage,
    LeitorPage,
    ListaProfessorPage,
    LoginPage,
    PerfilPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    CadDisciplinaPage,
    CadProfessorPage,
    CadastrosPage,
    ColetorPage,
    MyApp,
    HomePage,
    LeitorPage,
    ListaProfessorPage,
    LoginPage,
    PerfilPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ProfessorProvider,
    BarcodeScanner,
    BaseProvider,
    DisciplinaProvider,
    ColetorProvider,
  ]
})
export class AppModule {}
