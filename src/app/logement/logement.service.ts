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

 getFilteredLogements(prix?: number, adresse?: string): Observable<Logement[]> {
  return this.getLogements().pipe(
    map(logements =>
      logements.filter(l =>
        (prix == null || l.prix === prix) &&
        (adresse == null || l.adresse.toLowerCase().includes(adresse.toLowerCase()))
      )
    )
  );
}

ajouterLogement(logement: any, cin_proprietaire: number): Observable<any> {
    return this.http.post(this.apiUrl, { ...logement, cin_proprietaire });
  }

}
