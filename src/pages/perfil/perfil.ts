import { ProfessorProvider } from './../../providers/professor';
import { User } from './../../model/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { EdiProfessorPage } from '../edi-professor/edi-professor';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  //OBJETO DO USUARIO LOGADO
  currentUser: User;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,   
    private provider: ProfessorProvider,
    public loadingCtrl: LoadingController,   
  ) 
  {
    this.currentUser = null;
    //RECEBE DADOS POR PARAMETRO DA TELA DE HOME
    this.currentUser = this.navParams.get("dados");
  }

  ionViewCanEnter(){
    //CRIA O LOADING
    let loading: Loading = this.showLoading();

    //BUSCA O OBJETO DO USUARIO QUE ESTA LOGADO 
    const subscribe = this.provider.get().subscribe((c: User) => {
      subscribe.unsubscribe();

      //E CARREGA O OBJETO COM OS DADOS
      this.currentUser.url = c.url; 
      
      //FECHA O LOADING
      loading.dismiss();
    })
  }
  
  //MANDA OS DADOS PARA A PAGINA DE EDIÇÂO
  editarProfessor(): void {
    this.navCtrl.push(EdiProfessorPage, {dados: this.currentUser});
  }

  //FUNÇÃO RESPONSAVEL PELA CRIAÇÂO DO SHOWLOADING
  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
  
    return loading;
  }
}
