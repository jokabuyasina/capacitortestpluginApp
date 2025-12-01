import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonRow, IonCol, IonGrid } from '@ionic/angular/standalone';
import { MyCapacitorPlugin, MyPosition } from 'capacitor-exampleplugin';
import * as L from 'leaflet'; // Note: You need to install leaflet and @types/leaflet
// import { MyPosition } from '../interface/cords';
// npm install leaflet
// npm install @types/leaflet

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonGrid, IonCol, IonRow, CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon],
})
export class HomePage {



    coordinates: MyPosition | null = null;
     isEmergency = false;
  map: L.Map | null = null;

  constructor() {}

  async callAllMethod() {
    try {
      const coordinates = await MyCapacitorPlugin.getCurrentPosition();
      this.coordinates = {latitude: coordinates.latitude, longitude: coordinates.longitude};
      console.log("showing coordinates bellow debug", this.coordinates.latitude, this.coordinates.longitude);
      console.log(coordinates);
      this.loadMap();
    } catch (error) {
      console.error('Error getting location:', error);
      alert('Error: ' + error);
    }
  }

  toggleEmergency() {
    this.isEmergency = !this.isEmergency;
  }

  loadMap() {
    if (!this.coordinates) {
      return;
    }
    if (this.map) {
      this.map.remove();
    }
    this.map = L.map('map').setView([this.coordinates.latitude, this.coordinates.longitude], 13);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 21
    }).addTo(this.map);

    L.marker([this.coordinates.latitude, this.coordinates.longitude]).addTo(this.map)
      .bindPopup('Your Location')
      .openPopup();
  }
}