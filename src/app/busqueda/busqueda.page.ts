import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonLabel, IonInput, IonSelect, IonSelectOption, IonCardHeader, IonCardTitle, IonRow, IonCol, IonGrid, IonCard, IonCardContent, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonThumbnail } from '@ionic/angular/standalone';
import { ServicioCochesService } from '../servicioCoches.service';
import { Coche } from '../coche';

@Component({
  selector: 'app-busqueda',
  templateUrl: 'busqueda.page.html',
  styleUrls: ['busqueda.page.scss'],
  imports: [ IonLabel, IonInput, IonSelect, IonSelectOption, IonCardHeader, IonCardTitle, IonRow, IonCol, IonGrid, IonCard, IonCardContent, CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonThumbnail]
})

export class BusquedaPage {
  coches: Coche[] = []; 

  cochesCol1: Coche[] = [];
  cochesCol2: Coche[] = [];

  // Variables para los filtros y ordenaciones
  selectedCombustible: string = '';
  selectedMarca: string = '';
  selectedKilometros: number | null = null;
  selectedFecha: string = '';
  selectedOrdenPrecio: 'asc' | 'desc' = 'asc';
  selectedOrdenKilometros: 'asc' | 'desc' = 'asc';
  selectedOrdenFecha: 'asc' | 'desc' = 'asc';
  selectedMatricula: string = '';
  // Modificación en el componente
  selectedDisponibilidad: string = 'todos'; // Valor inicial

  constructor(private serviciocoches: ServicioCochesService) {}

  ngOnInit() {
    this.cargarCoches();
  }

  // Modificar cargarCoches para usar actualizarColumnas
  cargarCoches(): void {
    this.serviciocoches.getCoches().subscribe(data => {
      this.coches = data;
      this.actualizarColumnas();
    });
  }

  filtrarDisponibilidad(): void {
    if (this.selectedDisponibilidad !== null) {
      this.serviciocoches.getCoches().subscribe(data => {
        // 'coche' aquí es el parámetro del filter (correcto)
        this.coches = data.filter(coche => {
          return coche.disponible === (this.selectedDisponibilidad === 'true');
        });
        this.actualizarColumnas();
      });
    } else {
      this.cargarCoches();
    }
  }

   // Método único para actualizar columnas
   private actualizarColumnas(): void {
    this.cochesCol1 = this.coches.filter((_, index) => index % 2 === 0);
    this.cochesCol2 = this.coches.filter((_, index) => index % 2 !== 0);
  }

  // Filtrar por Matrícula
  filtrarPorMatricula(): void {
    if (this.selectedMatricula) {
        this.serviciocoches.filtrarPorMatricula(this.selectedMatricula)
            .subscribe((data: Coche[]) => {
                this.coches = data;
                this.actualizarColumnas();
            });
    } else {
        this.cargarCoches();
    }
  }


  // Filtrar por combustible
  filtrarPorCombustible(): void {
    if (this.selectedCombustible) {
        this.serviciocoches.filtrarPorCombustible(this.selectedCombustible)
            .subscribe((data: Coche[]) => {
                this.coches = data;
                this.actualizarColumnas();
            });
    } else {
        this.cargarCoches();
    }
}

  // Actualizar todos los demás métodos para usar actualizarColumnas()
  // Ejemplo con filtrarPorMarca:
  filtrarPorMarca(): void {
    if (this.selectedMarca) {
      this.serviciocoches.filtrarPorMarca(this.selectedMarca).subscribe(data => {
        this.coches = data;
        this.actualizarColumnas();
      });
    } else {
      this.cargarCoches();
    }
  }

  // Filtrar por kilometros
  filtrarPorKilometros(): void {
    if (this.selectedKilometros !== null) {
      this.serviciocoches.filtrarPorKilometros(this.selectedKilometros).subscribe(data => {
        this.coches = data;
        this.cochesCol1 = this.coches.filter((_, index) => index % 2 === 0);
        this.cochesCol2 = this.coches.filter((_, index) => index % 2 !== 0);
      });
    } else {
      this.cargarCoches();
    }
  }

  // Filtrar por fecha
  filtrarPorFecha(): void {
    if (this.selectedFecha) {
      this.serviciocoches.filtrarPorFecha(this.selectedFecha).subscribe(data => {
        this.coches = data;
        this.cochesCol1 = this.coches.filter((_, index) => index % 2 === 0);
        this.cochesCol2 = this.coches.filter((_, index) => index % 2 !== 0);
      });
    } else {
      this.cargarCoches();
    }
  }

  // Ordenar por precio
  ordenarPorPrecio(): void {
    this.serviciocoches.ordenarPorPrecio(this.selectedOrdenPrecio)
        .subscribe((data: Coche[]) => {
            this.coches = data;
            this.actualizarColumnas();
        });
}

  // Ordenar por kilometros
  ordenarPorKilometros(): void {
    this.serviciocoches.ordenarPorKilometros(this.selectedOrdenKilometros).subscribe(data => {
      this.coches = data;
      this.cochesCol1 = this.coches.filter((_, index) => index % 2 === 0);
      this.cochesCol2 = this.coches.filter((_, index) => index % 2 !== 0);
    });
  }

  // Ordenar por fecha
  ordenarPorFecha(): void {
    this.serviciocoches.ordenarPorFecha(this.selectedOrdenFecha).subscribe(data => {
      this.coches = data;
      this.cochesCol1 = this.coches.filter((_, index) => index % 2 === 0);
      this.cochesCol2 = this.coches.filter((_, index) => index % 2 !== 0);
    });
  }
}
