import { ProfessorProvider } from './../../providers/professor';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LeitorPage } from '../leitor/leitor';

@IonicPage()
@Component({
  selector: 'page-coletor',
  templateUrl: 'coletor.html',
})
export class ColetorPage {

  currentUser: any;

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

  abrirLeitor(): void{
    this.navCtrl.push(LeitorPage);
  }
}
