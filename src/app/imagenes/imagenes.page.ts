import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.page.html',
  styleUrls: ['./imagenes.page.scss'],
})
export class ImagenesPage implements OnInit {

  constructor(private router: Router) { }

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
  
}
