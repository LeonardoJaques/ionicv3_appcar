import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../modelos/usuario';

const CHAVE = 'avatar-usuario'

@Injectable()
export class UsuariosServiceProvider {
  private _usuarioLogado: Usuario;
  constructor(private _http: HttpClient) {
  }

  efetuaLogin(email, senha){
   return this._http.post<Usuario>('http://seulocalhost/api/login',{ email, senha })
              .do((usuario: Usuario) => this._usuarioLogado = usuario);
  }
  obtemUsuarioLogado(){
    return this._usuarioLogado;
  }


  salvaAvatar(avatar){
    localStorage.setItem(CHAVE,avatar);
  }
  
  obtemAvatar(){
    return localStorage.getItem(CHAVE)
    ?  localStorage.getItem(CHAVE)
    : 'assets/img/avatar-padrao.jpg';
  }

}
