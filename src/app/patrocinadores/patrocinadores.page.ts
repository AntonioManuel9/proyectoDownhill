import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-patrocinadores',
  templateUrl: './patrocinadores.page.html',
  styleUrls: ['./patrocinadores.page.scss'],
})
export class PatrocinadoresPage implements OnInit {

  constructor(private router: Router, private callNumber: CallNumber) { }

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
