import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Coche } from './coche';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicioCochesService {
  private apiCoches = 'https://apicoches.onrender.com/api/Coches';

  // 1) Creamos un BehaviorSubject que por defecto inicia con []
  private cochesSubject = new BehaviorSubject<Coche[]>([]);
  // 2) Exponemos un observable “coches$” al que se pueden suscribir otros componentes
  public coches$ = this.cochesSubject.asObservable();

  constructor(private http: HttpClient) {
    // Opcional: cargar la lista inicial de coches al crear el servicio
    this.refrescarLista();
  }

  /**
   * Método privado para refrescar la lista de coches desde la API
   * y emitirla a través del BehaviorSubject
   */
  private refrescarLista(): void {
    this.http.get<Coche[]>(this.apiCoches)
      .subscribe((listaCoches) => {
        // Emitimos la nueva lista
        this.cochesSubject.next(listaCoches);
      });
  }

  /**
   * Devuelve el observable con la lista de coches.
   * (Las páginas usan este método para suscribirse.)
   */
  getCoches(): Observable<Coche[]> {
    return this.coches$;
  }

  // Ejemplo de obtener la lista actual sincrónicamente
  // (útil si necesitas consultar momentáneamente su valor)
  getCochesActuales(): Coche[] {
    return this.cochesSubject.value;
  }

  /**
   * Agrega un nuevo coche en la BD a través de la API
   * y refresca la lista local cuando termine.
   */
  addCoche(coche: Coche): Observable<Coche> {
    return this.http.post<Coche>(this.apiCoches, coche).pipe(
      tap(() => this.refrescarLista())  // Al completar el POST, refrescamos la lista
    );
  }

  /**
   * Modificar un coche existente
   */
  updateCoche(id: number, coche: Coche): Observable<any> {
    const url = `${this.apiCoches}/${id}`;
    return this.http.put<any>(url, coche).pipe(
      tap(() => this.refrescarLista()) // Volvemos a refrescar al terminar
    );
  }

  /**
   * Eliminar un coche
   */
  deleteCoche(id: number): Observable<void> {
    const url = `${this.apiCoches}/${id}`;
    return this.http.delete<void>(url).pipe(
      tap(() => this.refrescarLista())
    );
  }

  getCochePorId(id: number): Observable<Coche> {
    const url = `${this.apiCoches}/${id}`;
    return this.http.get<Coche>(url);
  }

  /**
   * Ejemplo de métodos para filtrar en la API y refrescar la lista global,
   * aunque esto puede reemplazar completamente la lista principal.
   * Si quieres que la lista global siempre contenga “todos” los coches,
   * es mejor hacer los filtros en el front-end.
   */
  filtrarPorCombustible(combustible: string): Observable<Coche[]>  {
    // Hacemos la llamada a la API:
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
