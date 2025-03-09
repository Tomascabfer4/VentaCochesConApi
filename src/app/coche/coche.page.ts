import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonIcon, IonButton, IonAccordion, IonAccordionGroup, IonCardHeader, IonCardTitle, IonRow, IonCol, IonGrid, IonCard, IonCardContent, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonThumbnail } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline, createOutline } from 'ionicons/icons';
import { ServicioCochesService } from '../servicioCoches.service';
import { Coche } from '../coche';
import { AnnadirCocheComponent } from "../componentes/annadir-coche/annadir-coche.component";
import { ModificarCocheComponent } from "../componentes/modificar-coche/modificar-coche.component";

@Component({
  selector: 'app-coche',
  templateUrl: 'coche.page.html',
  styleUrls: ['coche.page.scss'],
  imports: [IonIcon, IonButton, IonAccordion, IonAccordionGroup, IonCardHeader, IonCardTitle, IonRow, IonCol, IonGrid, IonCard, IonCardContent, CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonThumbnail, AnnadirCocheComponent, ModificarCocheComponent]
})
export class CochePage {
  
  coches: Coche[] = []; 

  cochesCol1: Coche[] = [];
  cochesCol2: Coche[] = [];

  constructor(private serviciocoches: ServicioCochesService) {
    addIcons({ closeOutline,createOutline })
  }

  ngOnInit() {
    this.cargarCoches();
  }

  // Cargar todos los coches
  cargarCoches(): void {
    this.serviciocoches.getCoches().subscribe(data => {
      this.coches = data;
      this.cochesCol1 = this.coches.filter((_, index) => index % 2 === 0);
      this.cochesCol2 = this.coches.filter((_, index) => index % 2 !== 0);
    });
    
  }

  onCocheActualizado() {
    this.cargarCoches(); // Recarga la lista completa
  }

  // Eliminar un coche
  eliminarCoche(coche: Coche): void {
    this.serviciocoches.deleteCoche(coche.id).subscribe({
      next: () => this.cargarCoches(), // Recargar lista completa
      error: (err) => console.error('Error eliminando:', err)
    });
  }

  // Modificar un coche
  // modificarCoche(id: number): void {
  //   coche: cocheModificado = { /* objeto con cambios */ };
  //   this.serviciocoches.updateCoche(id, cocheModificado).subscribe(() => {
  //     this.cargarCoches(); // recargar la lista después de modificar
  //   });
  // }


}
