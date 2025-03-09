import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonAvatar, IonItemOption, IonItemOptions, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSegmentView, IonSegmentContent, IonList, IonItemSliding, IonSegment, IonSegmentButton, IonLabel, IonHeader, IonToolbar, IonTitle} from '@ionic/angular/standalone';
import { ServicioCochesService } from '../servicioCoches.service';
import { Coche } from '../coche';


@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss'],
  imports: [ IonAvatar, IonItemOption, IonItemOptions, CommonModule, FormsModule, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSegmentView, IonSegmentContent, IonList, IonItemSliding, IonSegment, IonSegmentButton, IonLabel, IonHeader, IonToolbar, IonTitle],
})
export class InicioPage {
  
  coches: Coche[] = []; 

  disponibles: Coche[] = []; 

  vendidos: Coche[] = []; 

  constructor(private serviciocoches: ServicioCochesService) {
    this.serviciocoches.getCoches().subscribe(data => {
      this.coches = data;
      
      // Filtramos los coches recibidos de la API
      this.disponibles = this.coches.filter(coche => coche.disponible === true);
      this.vendidos = this.coches.filter(coche => coche.disponible === false);

      console.log('Disponibles:', this.disponibles);
      console.log('Vendidos:', this.vendidos);
    });
  }

  // Función para cambiar disponibilidad
  cambiarDisponibilidad(coche: Coche, nuevoEstado: boolean): void {
    // Crear una copia actualizada del coche
    const cocheActualizado: Coche = {
      ...coche,
      disponible: nuevoEstado
    };
  
    this.serviciocoches.updateCoche(coche.id, cocheActualizado).subscribe({
      next: (respuesta) => {
        // Actualizar el array local
        const index = this.coches.findIndex(c => c.id === coche.id);
        if (index !== -1) {
          this.coches[index] = cocheActualizado;
        }
        this.actualizarArraysCoches();
        console.log('Disponibilidad actualizada con éxito');
      },
      error: (err) => {
        console.error('Error al actualizar:', err);
        // Revertir visualmente si falla
        coche.disponible = !nuevoEstado;
      }
    });
  }

// Actualiza los arrays de coches según su disponibilidad
actualizarArraysCoches() {
  this.disponibles = this.coches.filter(coche => coche.disponible === true);
  this.vendidos = this.coches.filter(coche => coche.disponible === false);
}

}
