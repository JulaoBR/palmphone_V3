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

  getAll() {
    return this.db.list(this.PATH, ref => ref.orderByChild('name'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
  }

  get() {
    var key = firebase.auth().currentUser.uid;

    return this.db.list(this.PATH + key).snapshotChanges()
    .map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    })
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
