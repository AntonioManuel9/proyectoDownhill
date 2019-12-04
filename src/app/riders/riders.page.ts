import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FirestoreService } from '../firestore.service';
import { Riders } from '../riders';

@Component({
  selector: 'app-riders',
  templateUrl: './riders.page.html',
  styleUrls: ['./riders.page.scss'],
})
export class RidersPage implements OnInit {

  document: any = {
    id: "",
    data: {} as Riders
  };

  ridersEditando: Riders;
  id = null;

  constructor(private firestoreService: FirestoreService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.firestoreService.consultarPorId("riders", this.id).subscribe((resultado) => {
      // Preguntar si se hay encontrado un document con ese ID
      if(resultado.payload.data() != null) {
        this.document.id = resultado.payload.id
        this.document.data = resultado.payload.data();
        // Como ejemplo, mostrar el título de la tarea en consola
        console.log(this.document.data.nombre);
      } else {
        // No se ha encontrado un document con ese ID. Vaciar los datos que hubiera
        this.document.data = {} as Riders;
      } 
    });
  }

  clicBotonBorrar() {

    this.firestoreService.borrar("riders", this.id).then(() => {
      // Limpiar datos de pantalla
      this.ridersEditando = {} as Riders;
    })

  }


}
