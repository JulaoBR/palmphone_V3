import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class ColetorProvider {

  constructor(
    private db: AngularFireDatabase,
  ) 
  {}
  
  //FUNCAO RESPONSAVEL POR SALVAR OS DADOS NO FIREBASE, RECEBE UMA LISTA E A CHAVE
  saveChamadas(dados: any, uuid: string){
    return this.db.object(`/chamadas/${uuid}`) // CHAMADAS SERA O NOME DA CHAVE ONDE FICARA OS DADOS
    .set(dados)
    .catch();
 }

}
