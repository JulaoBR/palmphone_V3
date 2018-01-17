import { ProfessorProvider } from './../../providers/professor';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  currentUser:  any;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private provider: ProfessorProvider
  ) 
  {
    this.currentUser = { };

    const subscribe = this.provider.get().subscribe((c: any) => {
      subscribe.unsubscribe();
   
      this.currentUser = c
  
      
    })
  }

 }
