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

  saveManual(dados: any){
    return new Promise((resolve, reject) => {     
      
        this.db.list(this.PATH)
          .push({ ra_aluno: dados.ra})
          .then(() => resolve());     
    })
 }

 saveScan(dados: string){
  return new Promise((resolve, reject) => {     
      
      this.db.list(this.PATH)
        .push({ ra_aluno: dados})
        .then(() => resolve());     
  })
}

 
}
