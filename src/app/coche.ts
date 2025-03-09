// coche.interface.ts
export interface Coche {
    id: number;                 // ID único del coche
    marca: string;              // Ej: "Toyota", "Renault"
    modelo: string;             // Ej: "Corolla", "Clio"
    combustible: string;        // Tipo: "Gasolina", "Diésel", "Eléctrico", "Híbrido"
    kilometros: number;         // Kilometraje (ej: 15000)
    precio: number;             // Precio en euros (ej: 25000)
    fecha: string | Date;       // Fecha de matriculación (ej: "2022-05-15" o Date)
    foto: string;               // URL de la imagen (ej: "https://...")
    disponible: boolean;        // Estado de disponibilidad
    matricula: string;          // Matrícula (ej: "ABC-1234")
  }