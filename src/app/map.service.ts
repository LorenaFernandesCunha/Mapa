import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Coordenadas } from './map/coordenadas';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  public coordenadasBroadcast = new Subject<Coordenadas>();

  constructor(private http: HttpClient) {
  }

//   makeCapitalMarkers(map: L.Map): void {
//  const marker = L.marker([-18.5013, -48.2622]).addTo(map);
//   }

}
