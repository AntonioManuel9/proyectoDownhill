import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { FirestoreService } from '../firestore.service';
import { Riders } from '../riders';
import { AlertController } from '@ionic/angular';
import { LoadingController, ToastController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

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
	public alertController: AlertController,
	private loadingController: LoadingController,
	private toastController: ToastController,
	private imagePicker: ImagePicker) { }

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

	navigateToImagenes() {
		this.router.navigate(["/imagenes/"]);
	  }
	
	navigateToInfoEvent() {
		this.router.navigate(["/info-event/"]);
	}

	navigateToPatrocinadores() {
		this.router.navigate(["/patrocinadores/"]);
	}

  clicBotonBorrar() {

    this.firestoreService.borrar("riders", this.id).then(() => {
      // Limpiar datos de pantalla
      this.ridersEditando = {} as Riders;
    })

  }

  async alertaInsertar() {
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

	async alertaModificar() {
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
						this.navigateToInicio();
					}
				}
			]
		});

		await alert.present();
	}

	async alertaBorrar() {
		const alert = await this.alertController.create({
			header: 'Confirmar',
			message: '¿Quieres borrar el rider <strong>'+ this.document.data.nombre +'</strong>?',
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
					text: 'Borrar',
					handler: () => {
						console.log('Confirm Okay');
						this.clicBotonBorrar();
						this.navigateToInicio();
					}
				}
			]
		});

		await alert.present();
	}

	async uploadImagePicker() {
		// Mensaje de espera mientras se sube la imagen
		const loading = await this.loadingController.create({
		  message: 'Please wait...'
		});
		// Mensaje de finalización de subida de la imagen
		const toast = await this.toastController.create({
		  message: 'Image was updated successfully',
		  duration: 3000
		});
		// Comprobar si la aplicación tiene permisos de lectura
		this.imagePicker.hasReadPermission().then(
		  (result) => {
			// Si no tiene permiso de lectura se solicita al usuario
			if(result == false){
			  this.imagePicker.requestReadPermission();
			}
			else {
			  // Abrir selector de imágenes (ImagePicker)
			  this.imagePicker.getPictures({
				maximumImagesCount: 1,  // Permitir sólo 1 imagen
				outputType: 1           // 1 = Base64
			  }).then(
				(results) => {  // En la variable results se tienen las imágenes seleccionadas
				  // Carpeta del Storage donde se almacenará la imagen
				  let nombreCarpeta = "imagenes";
				  // Recorrer todas las imágenes que haya seleccionado el usuario
				  //  aunque realmente sólo será 1 como se ha indicado en las opciones
				  for (var i = 0; i < results.length; i++) {      
					// Mostrar el mensaje de espera
					loading.present();
					// Asignar el nombre de la imagen en función de la hora actual para
					//  evitar duplicidades de nombres        
					let nombreImagen = `${new Date().getTime()}`;
					// Llamar al método que sube la imagen al Storage
					this.firestoreService.uploadImage(nombreCarpeta, nombreImagen, results[i])
					  .then(snapshot => {
						snapshot.ref.getDownloadURL()
						  .then(downloadURL => {
							// En la variable downloadURL se tiene la dirección de descarga de la imagen
							console.log("downloadURL:" + downloadURL);
							// Mostrar el mensaje de finalización de la subida
							toast.present();
							// Ocultar mensaje de espera
							loading.dismiss();
						  })
					  })
				  }
				},
				(err) => {
				  console.log(err)
				}
			  );
			}
		  }, (err) => {
			console.log(err);
		  });
	}
	 
	async deleteFile(fileURL) {
		const toast = await this.toastController.create({
		message: 'File was deleted successfully',
		duration: 3000
		});
		this.firestoreService.deleteFileFromURL(fileURL)
		.then(() => {
			toast.present();
		}, (err) => {
			console.log(err);
		});
	}
	 
}
