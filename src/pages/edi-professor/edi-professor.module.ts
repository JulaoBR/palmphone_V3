import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EdiProfessorPage } from './edi-professor';

@NgModule({
  declarations: [
    EdiProfessorPage,
  ],
  imports: [
    IonicPageModule.forChild(EdiProfessorPage),
  ],
})
export class EdiProfessorPageModule {}
