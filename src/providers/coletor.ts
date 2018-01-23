import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ColetorProvider {
  private PATH = 'coletor/';
  
  constructor(
    private db: AngularFireDatabase,
  ) 
  {

  }

  save(ra: string){
    return  this.db.list(this.PATH)
    .push({ ra_aluno: ra , data: '23/01/2018'})
    .then();
 }

 
}
