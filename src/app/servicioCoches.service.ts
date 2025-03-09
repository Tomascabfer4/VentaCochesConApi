import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coche } from './coche';

@Injectable({
  providedIn: 'root'
})
export class ServicioCochesService {

  private apiCoches = 'https://apicoches.onrender.com/api/Coches';

  public coches : any = [];
  
  constructor(private http: HttpClient) { }

  getCoches(): Observable<Coche[]> { // <-- Especificar tipo de retorno
    return this.http.get<Coche[]>(this.apiCoches);
}

  // Agregar un nuevo coche
  addCoche(coche: Coche): Observable<Coche> {
    return this.http.post<Coche>(this.apiCoches, coche);
  }

  // Modificar un coche existente
  updateCoche(id: number, coche: Coche): Observable<any> {
    const url = `${this.apiCoches}/${id}`;
    return this.http.put<any>(url, coche);
  }

  getCochePorId(id: number): Observable<Coche> {
    const url = `${this.apiCoches}/${id}`;
    return this.http.get<Coche>(url);
  }

  // Eliminar un coche (versión mejorada)
  deleteCoche(id: number): Observable<void> {
    const url = `${this.apiCoches}/${id}`;
    return this.http.delete<void>(url);
  }

   // Filtrar por combustible
   filtrarPorCombustible(combustible: string): Observable<Coche[]> {
    return this.http.get<Coche[]>(`${this.apiCoches}/combustible/${combustible}`);
  }

  // Filtrar por marca
  filtrarPorMarca(marca: string): Observable<Coche[]> {
    return this.http.get<Coche[]>(`${this.apiCoches}/marca/${marca}`);
  }

  // Filtrar por kilometros
  filtrarPorKilometros(kilometros: number): Observable<Coche[]> {
    return this.http.get<Coche[]>(`${this.apiCoches}/kilometros/${kilometros}`);
  }

  // Filtrar por fecha
  filtrarPorFecha(fecha: string): Observable<Coche[]> {
    return this.http.get<Coche[]>(`${this.apiCoches}/fecha/${fecha}`);
  }

  // Filtrar por disponibilidad
  filtrarDisponibles(): Observable<Coche[]> {
    return this.http.get<Coche[]>(`${this.apiCoches}/disponibles`);
  }

  // Filtrar por matrícula
  filtrarPorMatricula(matricula: string): Observable<Coche[]> {
    return this.http.get<Coche[]>(`${this.apiCoches}/matricula/${matricula}`);
  }

  // Ordenar por precio (asc o desc)
  ordenarPorPrecio(orden: 'asc' | 'desc'): Observable<Coche[]> {
    return this.http.get<Coche[]>(`${this.apiCoches}/ordenar/precio/${orden}`);
  }

  // Ordenar por kilometros (asc o desc)
  ordenarPorKilometros(orden: 'asc' | 'desc'): Observable<Coche[]> {
    return this.http.get<Coche[]>(`${this.apiCoches}/ordenar/kilometros/${orden}`);
  }

  // Ordenar por fecha (asc o desc)
  ordenarPorFecha(orden: 'asc' | 'desc'): Observable<Coche[]> {
    return this.http.get<Coche[]>(`${this.apiCoches}/ordenar/fecha/${orden}`);
  }

  // Ordenar por marca (asc o desc)
  ordenarPorMarca(orden: 'asc' | 'desc'): Observable<Coche[]> {
    return this.http.get<Coche[]>(`${this.apiCoches}/ordenar/marca/${orden}`);
  }

}
