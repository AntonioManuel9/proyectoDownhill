import { Component } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Riders } from '../riders';
import { Router } from "@angular/router";

import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  quotes: any;

  ridersEditando: Riders;
  
  arrayColeccionRiders: any = [{
    id: "",
    data: {} as Riders
   }];

  idRiderSelec: string;
  userEmail: String = "";
  userUID: String = ""; 
  isLogged: boolean;

  private  apiUrl :string = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=10"; 

  constructor(private firestoreService: FirestoreService, private router: Router,  private socialSharing: SocialSharing,private authService: AuthService, public afAuth: AngularFireAuth, private toastController: ToastController) {

    // Crear una tarea vacía
    this.ridersEditando = {} as Riders;

    this.obtenerListaRiders();

  }

  clicBotonInsertar() {

    this.firestoreService.insertar("riders", this.ridersEditando).then(() => {
      console.log('Rider creado correctamente!');
      this.ridersEditando= {} as Riders;
    }, (error) => {
      console.error(error);
    });

  }

  obtenerListaRiders() {

    this.firestoreService.consultar("riders").subscribe((resultadoConsultaRiders) => {
      this.arrayColeccionRiders = [];
      resultadoConsultaRiders.forEach((datosRiders: any) => {
        this.arrayColeccionRiders.push({
          id: datosRiders.payload.doc.id,
          data: datosRiders.payload.doc.data()
        });
      })
    });

  }

  selecRider(riderSelec) {
    console.log("Rider seleccionado: ");
    console.log(riderSelec);
    this.idRiderSelec = riderSelec.id;
    this.ridersEditando.nombre = riderSelec.data.nombre;
    this.ridersEditando.modeloBicicleta = riderSelec.data.modeloBicicleta;
  }

  clicBotonBorrar() {

    this.firestoreService.borrar("riders", this.idRiderSelec).then(() => {
      // Actualizar la lista completa
      this.obtenerListaRiders();
      // Limpiar datos de pantalla
      this.ridersEditando = {} as Riders;
    })

  }

  clicBotonModificar() {
    this.firestoreService.actualizar("riders", this.idRiderSelec, this.ridersEditando).then(() => {
      // Actualizar la lista completa
      this.obtenerListaRiders();
      // Limpiar datos de pantalla
      this.ridersEditando = {} as Riders;
    })
  }

  navigateToRiders(id) {
    if (this.userUID !== ""){
      this.router.navigate(["/riders/" + id]);
    }
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

  ionViewDidEnter() {
		this.isLogged = false;
		this.afAuth.user.subscribe(user => {
		  if(user){
			this.userEmail = user.email;
			this.userUID = user.uid;
			this.isLogged = true;
		  }
		})
	  }

	  async logout(){
		const toast = await this.toastController.create({
			message: 'Has cerrado sesión',
			duration: 3000
		});

		this.authService.doLogout()
		.then(res => {
		  this.userEmail = "";
		  this.userUID = "";
		  this.isLogged = false;
		  console.log(this.userEmail);
		  toast.present();
		}, err => console.log(err));
    }

    navigateToLogin() {
      this.router.navigate(["/login/"]);
    }

}
