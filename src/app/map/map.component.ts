import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { AddMushroomComponent } from '../add-mushroom/add-mushroom.component';
import { IGeoPoint } from '../models/geo-point';
import { MushroomService } from '../services/mushroom.service';
import { GeoPointService } from '../services/geo-point.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @ViewChild('container', {read: ViewContainerRef }) container!: ViewContainerRef;

  private map: any;
  mushroomPoints!: IGeoPoint[];

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 46.227638, 2.213749 ],
      zoom: 6
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    this.map.on('click', (e: any) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      console.log(`${lat}, ${lng}`);

      let newPoint: IGeoPoint = {
        location: {
          type: "Point",
          coordinates: [lat, lng]
        },
      };

      this.callComponent(newPoint);
    });
  }

  constructor(private geoPointService: GeoPointService) { }

  ngOnInit(): void {
    this.mushroomPoints = [];
    this.initMap();
    this.geoPointService.findAll().subscribe({
      next: (geoPoints) => {
        this.mushroomPoints = geoPoints;
        this.mushroomPoints.forEach(point => {
          console.log(point.location.coordinates[0], point.location.coordinates[1]);
          var icon = new L.Icon.Default(); // icon de base temporaire en attendant de fix la shadow
          icon.options.shadowSize = [0,0];
          L.marker([point.location.coordinates[0], point.location.coordinates[1]], {icon: icon}).addTo(this.map);
        });
      }
    });
  }

  callComponent(newPoint: IGeoPoint) {
    this.container.clear();
    const componentRef = this.container.createComponent(AddMushroomComponent);
    componentRef.instance.newPoint = newPoint;
    // set any inputs or outputs here
  }
}
