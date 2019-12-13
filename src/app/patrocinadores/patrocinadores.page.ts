import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-patrocinadores',
  templateUrl: './patrocinadores.page.html',
  styleUrls: ['./patrocinadores.page.scss'],
})
export class PatrocinadoresPage implements OnInit {

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
