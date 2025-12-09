import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Logement } from '../logement/logement.model';

@Injectable({
  providedIn: 'root'
})
export class LogementService {
  private apiUrl = 'http://localhost:3000/api/logement';

  constructor(private http: HttpClient) {}

  getLogements(): Observable<Logement[]> {
    return this.http.get<Logement[]>(this.apiUrl);
  }

 getFilteredLogements(prix?: number, ville?: string, type?: string, adresse?: string): Observable<Logement[]> {
  return this.getLogements().pipe(
    map(logements =>
      logements.filter(l =>
        (prix == null || l.prix <= prix) &&
        (ville == null || l.ville.toLowerCase().includes(ville.toLowerCase()))&&
        (adresse == null || l.adresse.toLowerCase().includes(adresse.toLowerCase())) &&
        (type == null || l.type.toLowerCase() === type.toLowerCase())
      )
    )
  );
}

ajouterLogement(logement: any, cin_proprietaire: number): Observable<any> {
    return this.http.post(this.apiUrl, { ...logement, cin_proprietaire });
  }
  
updateReserve(id: number, reserve: string) {
  return this.http.patch(`http://localhost:3000/api/colocataires/reserve/${id}`, { reserve });
}

}
