import { LeitorPage } from './../pages/leitor/leitor';
import { ColetorManualPage } from './../pages/coletor-manual/coletor-manual';
import { CadastrosPage } from './../pages/cadastros/cadastros';
import { CadProfessorPage } from './../pages/cad-professor/cad-professor';
import { CadAlunoPage } from './../pages/cad-aluno/cad-aluno';
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

@NgModule({
  declarations: [
    CadAlunoPage,
    CadDisciplinaPage,
    CadProfessorPage,
    CadastrosPage,
    ColetorManualPage,
    ColetorPage,
    MyApp,
    HomePage,
    LeitorPage,
    LoginPage,
    PerfilPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    CadAlunoPage,
    CadDisciplinaPage,
    CadProfessorPage,
    CadastrosPage,
    ColetorManualPage,
    ColetorPage,
    MyApp,
    HomePage,
    LeitorPage,
    LoginPage,
    PerfilPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
