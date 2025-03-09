import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { IonTextarea, IonDatetimeButton, IonModal, IonDatetime, IonList, IonCardContent, IonCard, IonLabel, IonButton, IonItem} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Coche } from 'src/app/coche';
import { ServicioCochesService } from 'src/app/servicioCoches.service';


@Component({
  selector: 'app-modificar-coche',
  templateUrl: './modificar-coche.component.html',
  styleUrls: ['./modificar-coche.component.scss'],
  imports: [ IonTextarea, IonDatetimeButton, IonModal, IonDatetime, IonCard, IonCardContent, IonList, IonLabel, IonItem, IonButton, CommonModule, FormsModule ]
})
export class ModificarCocheComponent implements OnInit{

  @Output() cocheModificado = new EventEmitter<void>();

  @Input() cocheId!: number;

  coche: Coche = {
    id: 0,
    marca: '',
    modelo: '',
    combustible: '',
    kilometros: 0,         
    precio: 0,             
    fecha: new Date().toISOString().split('T')[0],      
    foto: '',               
    disponible: true,        
    matricula: ''
};

constructor(private servicioCoches: ServicioCochesService, private alertController: AlertController) { }

ngOnInit() {}

// Metodo para poner todos los atributos vacios
elementosVacios(): boolean {
  return this.coche.marca == '' ||
    this.coche.modelo == '' ||
    this.coche.combustible == '' ||
    this.coche.kilometros == 0 ||
    this.coche.precio == 0 ||
    this.coche.fecha == '' ||
    this.coche.matricula == '' ||
    this.coche.foto == '';
}

// Se genera un metodo asincrono para mostrar la alerta,
// se hace así porque si no daría problemas al cerrar la alerta.
async mostrarAlerta(mensaje: string) {
  const alert = await this.alertController.create({
    header: 'Advertencia',
    message: mensaje,
    buttons: ['Aceptar']
  });
  await alert.present();
}

// Si no se rellenan todos los datos se muestra la alerta
async ejecutarBoton() {
  if (this.elementosVacios()) {
    await this.mostrarAlerta('Debes rellenar todos los campos.');
    return;
  }
  this.actualizarDatos(); // En lugar de insertarDatos()
}

// Corregir ngOnChanges
ngOnChanges(changes: SimpleChanges) {
  if (changes['cocheId'] && this.cocheId) { // Cambiado a cocheId
    console.log('ID recibido:', this.cocheId);
    this.cargarCoche(this.cocheId);
  }
}

// Modificar cargarCoche para formatear fecha correctamente
cargarCoche(id: number) {
  this.servicioCoches.getCochePorId(id).subscribe((data) => {
    if (data) {
      this.coche = {
        ...data,
        fecha: new Date(data.fecha).toISOString() // Formato ISO para el datetime
      };
      console.log('Coche cargado:', this.coche);
    }
  });
}

// Método para actualizar datos del coche
actualizarDatos() {
  const cocheActualizado: Coche = {
    ...this.coche,
    fecha: new Date(this.coche.fecha).toISOString().split('T')[0] // Formatear fecha
  };

  this.servicioCoches.updateCoche(this.cocheId, cocheActualizado).subscribe({
    next: (respuesta) => {
      console.log('Coche actualizado correctamente');
      this.cocheModificado.emit(); // Notificar al pad
      this.mostrarAlerta('Coche actualizado con éxito');
    },
    error: (err) => {
      console.error('Error actualizando coche:', err);
      this.mostrarAlerta('Error al actualizar el coche');
    }
  });
}


capturarFecha(event: any) {
  if (event.detail.value) {
    // Formatea la fecha a YYYY-MM-DD
    this.coche.fecha = event.detail.value.split('T')[0];
  } else {
    this.coche.fecha = '';
  }
}

// 📌 Método para subir la imagen a Firebase Storage
// uploadImage(event: any) {
//   const file = event.target.files[0];
//   if (!file) return;

//   this.firestorageService.uploadFile(file, 'empleados').subscribe(url => {
//     this.empleado.Cara = url; // Guarda la URL en el modelo
//     console.log('Imagen subida:', url);
//   });
// }

}