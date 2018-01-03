import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaProfessorPage } from './lista-professor';

@NgModule({
  declarations: [
    ListaProfessorPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaProfessorPage),
  ],
})
export class ListaProfessorPageModule {}
