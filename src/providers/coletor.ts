import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ColetorProvider {

  myDate: String = new Date().toISOString();

  constructor(
    private db: AngularFireDatabase,
  ) 
  {
    
  }

  save(ra: string): Promise<any> {
    return this.db.object(`/coletor/${this.myDate}`)
   .set(ra)
   .catch();
 }
 
}
