import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Logement } from '../logement/logement.model';

@Injectable({
  providedIn: 'root'
})
export class LogementService {
  private apiUrl = 'http://localhost:3000/api/colocataires'; 

  constructor(private http: HttpClient) {}

  getLogements(): Observable<Logement[]> {
    return this.http.get<Logement[]>(this.apiUrl);
  }

 getFilteredLogements(prix?: number, ville?: string, type?:string): Observable<Logement[]> {
  return this.getLogements().pipe(
    map(logements => {
        const filtered = logements.filter((l: Logement) => {
        const matchPrix = prix == null || l.prix <= prix;
        const matchVille = !ville  || l.ville.toLowerCase()==ville.toLowerCase();
        const matchType = !type || l.type.toLowerCase() === type.toLowerCase();
        return matchPrix && matchVille && matchType;
      });
      return filtered;
    })
  );
}

updateReserve(id: number, reserve: string) {
  return this.http.patch(`http://localhost:3000/api/colocataires/reserve/${id}`, { reserve });
}


}