import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Agendamento } from '../../modelos/agendamento';


@Injectable()
export class AgendamentosServiceProvider {

  private _url ='http://seulocalhost/api/'
  constructor(public _http: HttpClient) {
  }

  agenda(agendamento: Agendamento){
  return  this._http
              .post(this._url+ 'agendamento/agenda', agendamento)
              .do(()=> agendamento.enviado = true)
              .catch((err) => Observable.of( new Error('Falha no agendamento! Tente novamente mais tarde.')));

}

}
