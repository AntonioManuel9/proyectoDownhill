import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-info-event',
  templateUrl: './info-event.page.html',
  styleUrls: ['./info-event.page.scss'],
})
export class InfoEventPage implements OnInit {

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
