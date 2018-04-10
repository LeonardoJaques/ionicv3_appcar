import { Component} from '@angular/core';
import { NavController, LoadingController, AlertController} from 'ionic-angular';
import { Carro } from '../../modelos/carro';
import { HttpErrorResponse } from '@angular/common/http';
import { CarrosServiceProvider } from '../../providers/carros-service/carros-service';
import { NavLifecycles } from '../../utils/ionic/nav/nav-lifecycles';
import { EscolhaPage } from '../escolha/escolha';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements NavLifecycles {

  public carros: Carro[];
  constructor(public navCtrl: NavController,
             private _LoadingCtrl : LoadingController,
             private _arlertCtrl : AlertController,
             private _carrosService: CarrosServiceProvider) {} 

  ionViewDidLoad(){
    let loading = this._LoadingCtrl.create({
                  content: 'Carregando os carros...'
    });
        
    loading.present();
    
    this._carrosService.lista()
              .subscribe(
                (carros) => {
                        this.carros = carros
                        loading.dismiss();
                      },
                      (err: HttpErrorResponse )=>{
                        console.log(err);
                        loading.dismiss();
                        this._arlertCtrl.create({
                          title : 'Falha na concexão',
                          subTitle: 'Não foi possível carregar a lista de carro. Servidor em manutenção!',
                          buttons: [
                            { text: 'Ok' }]
                        }).present();
                      }
                    );
 }

 selecionaCarro(carro : Carro) {
   console.log(carro);
   this.navCtrl.push(EscolhaPage.name, {
     carroSelecionado: carro
   });
 }

}


