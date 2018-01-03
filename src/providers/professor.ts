import { BaseProvider } from './base';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './../model/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import * as firebase from 'firebase/app';

@Injectable()
export class ProfessorProvider extends BaseProvider {

  private PATH = 'professor/';
  users: Observable<User[]>;
  currentUser: AngularFireObject<User>;
  
  constructor(
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
  ) 
  {
    super();
    this.listenAuthState();
  }


  private setUsers(uidToExclude: string): void {
    this.users = this.mapListKeys<User>(
      this.db.list<User>(`/professor`, 
        (ref: firebase.database.Reference) => ref.orderByChild('name')
      )
    )
    .map((users: User[]) => {      
      return users.filter((user: User) => user.$key !== uidToExclude);
    });
  }

  private listenAuthState(): void {
    this.afAuth
      .authState
      .subscribe((authUser: firebase.User) => {
        if (authUser) {
          console.log('Auth state alterado!');          
          this.currentUser = this.db.object(`/professor/${authUser.uid}`);

          //APENAS PARA VERIFICAÇÂO
          if(this.currentUser == null){
            console.log('nulo');
          }else{
            console.log('nao nulo');
          }
          
          this.setUsers(authUser.uid);
        }
      });
  }
 
  save(user: User, uuid: string): Promise<any> {
     return this.db.object(`/professor/${uuid}`)
    .set(user)
    .catch();
  }
 
}
