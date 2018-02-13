import { HomePage } from './../home/home';
import { User } from './../../model/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController, Loading } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  //CRIA UM OBJETO DO TIPO USER
  user: User;
  //CRIA UM OBJETO PARA O FORMULARIO
  signinForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private afAuth: AuthProvider,
    public loadingCtrl: LoadingController,
  ) 
  {
    //TRABAMENTO DOS CARACTERES DIGITADOS DURANTE O LOGIN
    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    //PREENCHE O OBJETO DO FORM COM OS DADOS VINDO DA TELA DE LOGIN
    this.signinForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  //FUNÇÃO DE LOGIN
  signIn() {
    //CHAMA UM SHOEDIALOG PARA MOSTRAR O CARREGAMENTO DO APP
    let loading: Loading = this.showLoading();

    //SE OS DADOS DO FORMULARIO FOREM VALIDOS ELE AUTENTICA 
    this.afAuth.signIn(this.signinForm.value)
      .then(() => {
        //CHAMA A TELA DE HOME DO APP
        this.navCtrl.setRoot(HomePage);
        //TIRA O SHOWLOADING 
        loading.dismiss();
      })
        //MOSTRA OS ERROS QUE PODEM DAR E A MENSAGEM QUE IRA APARECER PARA O USUARIO
      .catch((error: any) => {
        let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });
        if (error.code == 'auth/invalid-email') {
          toast.setMessage('O e-mail digitado não é valido.');
        } else if (error.code == 'auth/user-disabled') {
          toast.setMessage('O usuário está desativado.');
        } else if (error.code == 'auth/user-not-found') {
          toast.setMessage('O usuário não foi encontrado.');
        } else if (error.code == 'auth/wrong-password') {
          toast.setMessage('A senha digitada não é valida.');
        }
        toast.present();
        //TIRA O SHOWLOADING 
        loading.dismiss();
      });
    
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
