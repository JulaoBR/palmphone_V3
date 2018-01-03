import { User } from './../../model/user';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { ProfessorProvider } from './../../providers/professor';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from "rxjs/Observable";
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  currentUser: User;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private provider: ProfessorProvider
  ) 
  {
  }

  ionViewDidLoad() {
    this.provider.currentUser
      .valueChanges()
      .subscribe((user: User) => {
        this.currentUser = user;
        console.log(this.currentUser.name);
        console.log(this.currentUser.dtNascimento);
        console.log(this.currentUser.cpf);
        console.log(this.currentUser.email);
      });

  }

  teste(){
    if(this.currentUser == null){
      console.log('nulo');
    }else{
      console.log('nao nulo');
    }
     
  }
 
}
