import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ColetorManualPage } from './coletor-manual';

@NgModule({
  declarations: [
    ColetorManualPage,
  ],
  imports: [
    IonicPageModule.forChild(ColetorManualPage),
  ],
})
export class ColetorManualPageModule {}
