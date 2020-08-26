import { MarkerService } from './../marker.service';
import { MapService } from './../map.service';
import { Coordenadas } from './../map/coordenadas';
import { Component, OnInit } from '@angular/core';
import { Endereco } from './enderecoModel';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reclamacoes',
  templateUrl: './reclamacoes.component.html',
  styleUrls: ['./reclamacoes.component.css']
})
export class ReclamacoesComponent implements OnInit {

  public endereco: Endereco;
  private coordenadas: Coordenadas;

  constructor(
    private http: HttpClient,
    private mapService: MapService,
    private markerService: MarkerService
    ) {
    this.endereco = new Endereco();
    this.coordenadas = new Coordenadas();
    this.endereco.rua = 'Rua das Tulipas';
    this.endereco.numero = 31;
    this.endereco.bairro = 'Cidade Jardim';
    this.endereco.cep = '38412-190';
   }

  ngOnInit() {
  }

  converterEnderecoParaCep(endereco: Endereco){

    const urlBase = 'https://www.google.com/maps/';
    const queryParams = `?rua=${endereco.rua}+?numero=${endereco.numero}+?bairro=${endereco.bairro}+?cep=${endereco.cep}`;
    this.http.get(`${urlBase}${queryParams}`)
    .subscribe(
      response => {},
      errorResponse => {
        const { error } = errorResponse;
        const parsedError = error.text.substring(error.text.indexOf('center=-') + 7, error.text.indexOf('&'));
        const coordenadas = parsedError.split('%2C');
        console.log(errorResponse)
        this.coordenadas.latitude = coordenadas[0];
        this.coordenadas.longitude = coordenadas[1];
        console.log(this.coordenadas.latitude, this.coordenadas.longitude);
        this.mapService.coordenadasBroadcast.next(this.coordenadas);
      });
  }

  eventoDeBlurDoFormulario() {
    this.converterEnderecoParaCep(this.endereco);
  }

}
