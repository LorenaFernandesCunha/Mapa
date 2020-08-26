import { MapService } from './map.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { MapComponent } from './map/map.component';

import { geoJSON } from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {


  constructor(private http: HttpClient) {


  }


  // makeCapitalMarkers(map: L.Map): void {
  //       const marker = L.marker([-18.9113, -48.2622]).addTo(map);
  //     }

  }

