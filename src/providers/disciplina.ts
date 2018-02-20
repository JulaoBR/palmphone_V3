import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

import { FirebaseApp } from 'angularfire2';

@Injectable()
export class DisciplinaProvider {

  private PATH = 'disciplina/disciplina';

  constructor(
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public firebaseApp: FirebaseApp,
  ) 
  {
    
  }

  getAll() {
    return this.db.list(this.PATH, ref => ref.orderByChild('disciplina'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
  }

}
