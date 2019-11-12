import { Component } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Riders } from '../riders';

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

  constructor(private firestoreService: FirestoreService) {

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

  selecRider(RiderSelec) {
    console.log("Rider seleccionado: ");
    console.log(RiderSelec);
    this.idRiderSelec = RiderSelec.id;
    this.ridersEditando.nombre = RiderSelec.data.titulo;
    this.ridersEditando.modeloBicicleta = RiderSelec.data.descripcion;
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

}
