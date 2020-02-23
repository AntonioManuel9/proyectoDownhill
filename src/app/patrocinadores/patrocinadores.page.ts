import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CallNumber } from '@ionic-native/call-number/ngx';
import {Map,tileLayer,marker} from 'leaflet';

@Component({
  selector: 'app-patrocinadores',
  templateUrl: './patrocinadores.page.html',
  styleUrls: ['./patrocinadores.page.scss'],
})
export class PatrocinadoresPage implements OnInit {

  map:Map;
  newMarker:any;
  address:string[];

  constructor(private router: Router, private callNumber: CallNumber) { }

  ionViewDidEnter(){
    this.loadMap();
  }
  // The below function is added
  loadMap() {
    this.map = new Map("mapId").setView([36.758853, -5.368849], 15);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY- SA</a>' })
      .addTo(this.map); 

      this.newMarker = marker([36.759750,-5.371799], {draggable: 
        true}).addTo(this.map);
  }

  ngOnInit() {
  }

  navigateToInicio() {
		this.router.navigate(["/"]);

  }
  
  navigateToImagenes() {
    this.router.navigate(["/imagenes/"]);
  }
	
	navigateToInfoEvent() {
		this.router.navigate(["/info-event/"]);
	}

	navigateToPatrocinadores() {
		this.router.navigate(["/patrocinadores/"]);
  }
  
  llamar() {
    this.callNumber.callNumber("123456789", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }
}
