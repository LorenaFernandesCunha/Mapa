import { MapService } from './../map.service';
import { Coordenadas } from './coordenadas';
import { MarkerService } from './../marker.service';
import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';


const iconRetinaUrl = 'https://png.pngtree.com/element_our/png_detail/20181227/marker-line-black-icon-png_287178.jpg';
const iconUrl = 'https://png.pngtree.com/element_our/png_detail/20181227/marker-line-black-icon-png_287178.jpg';
const shadowUrl = 'https://png.pngtree.com/element_our/png_detail/20181227/marker-line-black-icon-png_287178.jpg';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [10, 10],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;




@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map;
  private coordenadas: Coordenadas;

  constructor(private mapService: MapService, private markerService: MarkerService) {
    this.coordenadas = new Coordenadas();
  }

  ngAfterViewInit(): void {
    this.positionDefaultMap();
    this.initMap();

  }

  private initMap(): void {
    this.mapService.coordenadasBroadcast.subscribe((coords: Coordenadas) => {
      this.coordenadas = coords;
      if (this.map) {
        this.map.remove();
      }
      this.map = L.map('map', {
        center: [this.coordenadas.latitude, this.coordenadas.longitude],
        zoom: 17,
      });

      const tiles = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          maxZoom: 19,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }
      );

      tiles.addTo(this.map);
    });
  }

  positionDefaultMap() {
    this.obterLocalizacaoAtual();
    if (this.map) {
      this.map.remove();
    }

    this.map = L.map('map', {
      center: [-18.894668, -48.269871], // Localização Padrão Caso o Usuário
      zoom: 3,                         // Não Pertia no Navegador o recurso de localiza-lo no Mapa.
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(this.map);
    L.marker([this.coordenadas.latitude, this.coordenadas.longitude]).addTo(this.map);
  }

  obterLocalizacaoAtual() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.coordenadas.latitude = position.coords.latitude;
        this.coordenadas.longitude = position.coords.longitude;
        this.mapService.coordenadasBroadcast.next(this.coordenadas);
        // this.mapService.makeCapitalMarkers(this.map);
        console.log(this.coordenadas.latitude);
        console.log(this.coordenadas.longitude);
        L.marker([this.coordenadas.latitude, this.coordenadas.longitude]).addTo(this.map);

      });
    }
  }




}





