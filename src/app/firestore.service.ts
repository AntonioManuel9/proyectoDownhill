import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private angularFirestore: AngularFirestore) { 

  }

  public insertar(coleccion, datos) {

    return this.angularFirestore.collection(coleccion).add(datos);

  } 
    
  public consultar(coleccion) {

    return this.angularFirestore.collection(coleccion).snapshotChanges();

  }

  public borrar (coleccion, documentoId) {

    return this.angularFirestore.collection(coleccion).doc(documentoId).delete();

  }

  public actualizar(coleccion, documentoId, datos) {

    return this.angularFirestore.collection(coleccion).doc(documentoId).set(datos);

   }
}
