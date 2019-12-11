import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { FirestoreService } from '../firestore.service';
import { Riders } from '../riders';
import { AlertController } from '@ionic/angular';

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

  constructor(private firestoreService: FirestoreService, 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public alertController: AlertController) { }

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

  clicBotonInsertar() {
		this.firestoreService.insertar("riders", this.document.data).then(() => {
			console.log('Rider creado correctamente!');
			this.document.data = {} as Riders;
			this.navigateToInicio();
		}, (error) => {
			console.error(error);
		});
	}

	clicBotonModificar() {
		this.firestoreService.actualizar("riders", this.id, this.document.data).then(() => {
			this.document.data = {} as Riders;
			this.navigateToInicio();
		})
	}

	navigateToInicio() {
		this.router.navigate(["/"]);

	}

  clicBotonBorrar() {

    this.firestoreService.borrar("riders", this.id).then(() => {
      // Limpiar datos de pantalla
      this.ridersEditando = {} as Riders;
    })

  }

  async confirmacionInsertar() {
		const alert = await this.alertController.create({
			header: 'Confirmar',
			message: '¿Crear el rider <strong>'+ this.document.data.nombre +'</strong>?',
			buttons: [
				{
					text: 'Descartar',
					cssClass: 'secondary',
					handler: (blah) => {
						console.log('Confirm Cancel');
						this.navigateToInicio();
					}
				},
				{
					text: 'Cancelar',
					role: 'cancel',
					cssClass: 'secondary',
					handler: (blah) => {
						console.log('Confirm Cancel');
					}
				},
				{
					text: 'Guardar',
					handler: () => {
						console.log('Confirm Okay');
						this.clicBotonInsertar();
					}
				}
			]
		});

		await alert.present();
	}

	async confirmacionModificar() {
		const alert = await this.alertController.create({
			header: 'Confirmar',
			message: '¿Guardar cambios en el rider <strong>'+ this.document.data.nombre +'</strong>?',
			buttons: [
				{
					text: 'Descartar',
					cssClass: 'secondary',
					handler: (blah) => {
						console.log('Confirm Cancel');
						this.navigateToInicio();
					}
				},
				{
					text: 'Cancelar',
					role: 'cancel',
					cssClass: 'secondary',
					handler: (blah) => {
						console.log('Confirm Cancel');
					}
				},
				{
					text: 'Guardar',
					handler: () => {
						console.log('Confirm Okay');
						this.clicBotonModificar();
					}
				}
			]
		});

		await alert.present();
	}

}
