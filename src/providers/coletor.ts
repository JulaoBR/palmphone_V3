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

  save(dados: any){
    return new Promise((resolve, reject) => {     
        console.log(dados.ra);
        this.db.list(this.PATH)
          .push({ ra_aluno: dados.ra, data: dados.data })
          .then(() => resolve());     
    })
 }

 
}
