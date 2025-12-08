/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  reservations: any[] = [];

  addReservation(logement: any) {
    const newReserv = {
      logement: logement.titre,
      date: new Date().toLocaleDateString(),
      statut: 'En attente'
    };
    this.reservations.push(newReserv);
  }
  removeReservation(logementTitre: string) {
  this.reservations = this.reservations.filter(r => r.logement !== logementTitre);
}

  getReservations() {
    return this.reservations;
  }
}
*/
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  // BehaviorSubject holds the current array of reservations
  private reservationsSubject = new BehaviorSubject<any[]>([]);
  
  // Observable for components to subscribe
  reservations$ = this.reservationsSubject.asObservable();

  constructor(private http: HttpClient) {}
   private apiUrl = 'http://localhost:3000/reservations';
  // Add a reservation
  addReservation(data: any) {
  return this.http.post(`http://localhost:3000/reservations/${data.logementId}`, data);
}

  removeReservation(data: any) {
  return this.http.delete(`http://localhost:3000/reservations/${data.logementId}`, {body:{ cin: data.cin }});
  }

  // get current value
  getReservations() {
    return this.reservationsSubject.value;
  }
}
