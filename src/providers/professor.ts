import { User } from './../model/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ProfessorProvider {

  private PATH = 'professor/';

  constructor(
    private db: AngularFireDatabase,
  ) 
  {
  }

  getAll() {
    return this.db.list(this.PATH, ref => ref.orderByChild('name'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
  }
 
  get(key: string) {
    return this.db.object(this.PATH + key).snapshotChanges()
      .map(c => {
        return { key: c.key, ...c.payload.val() };
      });
  }
 
  save(user: User, uuid: string): Promise<any> {
     return this.db.object(`/professor/${uuid}`)
    .set(user)
    .catch();
  }
 
  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }
}
