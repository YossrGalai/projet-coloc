import { Injectable } from '@angular/core';

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
