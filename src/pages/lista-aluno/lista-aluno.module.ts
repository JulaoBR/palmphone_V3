import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaAlunoPage } from './lista-aluno';

@NgModule({
  declarations: [
    ListaAlunoPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaAlunoPage),
  ],
})
export class ListaAlunoPageModule {}
