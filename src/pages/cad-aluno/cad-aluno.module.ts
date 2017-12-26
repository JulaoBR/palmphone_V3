import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadAlunoPage } from './cad-aluno';

@NgModule({
  declarations: [
    CadAlunoPage,
  ],
  imports: [
    IonicPageModule.forChild(CadAlunoPage),
  ],
})
export class CadAlunoPageModule {}
