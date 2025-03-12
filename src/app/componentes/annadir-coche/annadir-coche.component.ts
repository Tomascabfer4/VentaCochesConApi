import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { IonInput, IonCard, IonCardContent, IonList, IonLabel, IonItem, IonTextarea, IonButton } from '@ionic/angular/standalone';
import { Coche } from 'src/app/coche';
import { ServicioCochesService } from 'src/app/servicioCoches.service';
//import { FirestorageService } from 'src/app/servicios/firestorage.service';

@Component({
  selector: 'app-annadir-coche',
  templateUrl: './annadir-coche.component.html',
  styleUrls: ['./annadir-coche.component.scss'],
  imports: [ IonInput, IonCard, IonCardContent, IonList, IonLabel, IonItem, IonTextarea, IonButton, CommonModule, FormsModule]
})
export class AnnadirCocheComponent  implements OnInit {

  @Output() cocheAnadido = new EventEmitter<void>();

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
    this.insertarDatos();
  }

  // Método para insertar datos
  insertarDatos() {
    this.servicioCoches.addCoche(this.coche).subscribe({
      next: () => {
        console.log('Coche agregado correctamente');
        this.cocheAnadido.emit(); 
        this.elementosVacios();
        this.coche = {
          id: 0,
          marca: '',
          modelo: '',
          combustible: '',
          kilometros: 0,         
          precio: 0,             
          fecha: '',      
          foto: '',               
          disponible: true,        
          matricula: ''
        };
      },
      error: (err) => console.error('Error agregando coche:', err)
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
