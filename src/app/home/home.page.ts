import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonRow, IonCol, IonGrid, IonList, IonAvatar, IonLabel, IonItem } from '@ionic/angular/standalone';
import { MyCapacitorPlugin, MyPosition } from 'capacitor-exampleplugin';
import { Device } from '@capacitor/device';
import * as L from 'leaflet'; // Note: You need to install leaflet and @types/leaflet
// import { MyPosition } from '../interface/cords';
// npm install leaflet
// npm install @types/leaflet

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonItem, IonLabel, IonAvatar, IonList, IonGrid, IonCol, IonRow, CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon],
})
export class HomePage {


    deviceInfo: any | null = null;
    coordinates: MyPosition | null = null;
     isEmergency = false;
  map: L.Map | null = null;
    // Bottom sheet state
    sheetInitialHeight = 220; // initial height in px
    sheetHeight = this.sheetInitialHeight;
    sheetAnimating = false;
    private _sheetDragStartY: number | null = null;
    private _isMouseDragging = false;

  constructor() {
    this.getDeviceInfo();
  }


  getDeviceInfo = async () => {
    const info = await Device.getInfo();
    const infoBattery = await Device.getBatteryInfo();
    this.deviceInfo = {
      info:info,
      batteryInfo:infoBattery
    };
  }



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
    this.map = L.map('map').setView([this.coordinates.latitude, this.coordinates.longitude], 18);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: 'JONATHAN K',
      subdomains: 'abcd',
      maxZoom: 80,
    }).addTo(this.map);

      // Ensure the map resizes and stays centered. We'll use the overlay center marker
      setTimeout(() => {
        try { this.map?.invalidateSize(); } catch (e) {}
        this.map?.setView([this.coordinates!.latitude, this.coordinates!.longitude], 18);
      }, 120);
  }

    // --- Bottom sheet drag handlers ---
    onSheetTouchStart(ev: TouchEvent) {
      if (!ev.touches || ev.touches.length === 0) { return; }
      this._sheetDragStartY = ev.touches[0].clientY;
      this.sheetAnimating = false;
    }

    onSheetTouchMove(ev: TouchEvent) {
      if (this._sheetDragStartY == null) { return; }
      const clientY = ev.touches[0].clientY;
      const delta = this._sheetDragStartY - clientY; // positive when dragging up
      const newHeight = Math.max(60, this.sheetInitialHeight + delta);
      this.sheetHeight = newHeight;
    }

    onSheetTouchEnd(_ev: TouchEvent) {
      this._sheetDragStartY = null;
      this.snapSheetBack();
    }

    onSheetMouseDown(ev: MouseEvent) {
      this._isMouseDragging = true;
      this._sheetDragStartY = ev.clientY;
      this.sheetAnimating = false;
      const move = (e: MouseEvent) => {
        if (!this._isMouseDragging || this._sheetDragStartY == null) { return; }
        const delta = this._sheetDragStartY - e.clientY;
        this.sheetHeight = Math.max(60, this.sheetInitialHeight + delta);
      };
      const up = (_e: MouseEvent) => {
        this._isMouseDragging = false;
        this._sheetDragStartY = null;
        window.removeEventListener('mousemove', move);
        window.removeEventListener('mouseup', up);
        this.snapSheetBack();
      };
      window.addEventListener('mousemove', move);
      window.addEventListener('mouseup', up);
    }

    private snapSheetBack() {
      this.sheetAnimating = true;
      this.sheetHeight = this.sheetInitialHeight;
      // remove animating class after transition completes
      setTimeout(() => { this.sheetAnimating = false; }, 300);
    }
}