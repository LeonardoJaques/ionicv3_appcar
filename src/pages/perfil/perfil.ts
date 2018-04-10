import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, normalizeURL } from 'ionic-angular';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { Camera } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _usuarioService: UsuariosServiceProvider,
              private _camera: Camera ) {
  }
  
  tirafoto(){
    this._camera.getPicture({
      destinationType: this._camera.DestinationType.FILE_URI,
      saveToPhotoAlbum: true,
      correctOrientation: true
    }) 
    .then(fotoUri => {
      fotoUri = normalizeURL(fotoUri);
      this._usuarioService.salvaAvatar(fotoUri);
    }).catch(err =>console.log(err));
  }

  get avatar(){
    return this._usuarioService.obtemAvatar();
  }
  get usuarioLogado() {
    return this._usuarioService.obtemUsuarioLogado();

  }

}
