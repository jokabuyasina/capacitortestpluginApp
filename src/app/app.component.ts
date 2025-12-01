import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonApp, IonRouterOutlet, IonIcon } from '@ionic/angular/standalone';
import { CapacitorUpdater } from '@capgo/capacitor-updater';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet, CommonModule, IonIcon],
})
export class AppComponent implements OnInit {
  updateAvailable = false;
  updateInfo: any = null;

  constructor() {}

  ngOnInit() {
    CapacitorUpdater.addListener('updateAvailable', (res) => {
      console.log('Update available:', res);
      this.updateInfo = res;
      this.updateAvailable = true;
    });
  }

  dismissUpdate() {
    console.log('Update dismissed');
    this.updateAvailable = false;
    console.log('Current updateInfo state:', this.updateInfo);
    console.log('Current updateAvailable state:', this.updateAvailable);
  }

  doUpdate() {
    // This will restart the app and apply the update
    CapacitorUpdater.set(this.updateInfo);
  }
}
