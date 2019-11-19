import { Component } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Riders } from '../riders';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  ridersEditando: Riders;
  
  arrayColeccionRiders: any = [{
    id: "",
    data: {} as Riders
   }];

  idRiderSelec: string;

  constructor(private firestoreService: FirestoreService, private router: Router) {

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

  navigateToRiders(riderSelec) {
    this.router.navigate(["/riders/" + riderSelec.id]);
  }

}
