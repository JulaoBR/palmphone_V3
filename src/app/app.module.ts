import { EdiProfessorPage } from './../pages/edi-professor/edi-professor';
import { DatePipe } from '@angular/common';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { LeitorPage } from './../pages/leitor/leitor';
import { CadProfessorPage } from './../pages/cad-professor/cad-professor';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ColetorPage } from '../pages/coletor/coletor';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from '../pages/perfil/perfil';
import { AuthProvider } from '../providers/auth';
import { IonicStorageModule } from '@ionic/storage';
import { Dialogs } from '@ionic-native/dialogs';
import { ImagePicker } from '@ionic-native/image-picker';

import { FIREBASE_CONFIG } from './app.firebase.config';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ProfessorProvider } from '../providers/professor';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { BaseProvider } from '../providers/base';
import { ColetorProvider } from '../providers/coletor';

@NgModule({
  declarations: [
    CadProfessorPage,
    ColetorPage,
    MyApp,
    HomePage,
    LeitorPage,
    EdiProfessorPage,
    LoginPage,
    PerfilPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    CadProfessorPage,
    ColetorPage,
    MyApp,
    HomePage,
    LeitorPage,
    EdiProfessorPage,
    LoginPage,
    PerfilPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    DatePipe,
    ProfessorProvider,
    BarcodeScanner,
    BaseProvider,
    ColetorProvider,
    Dialogs,
    ImagePicker,
  ]
})
export class AppModule {}
