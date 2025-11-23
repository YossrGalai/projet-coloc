import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // Récupérer tous les colocataires
  getColocataires(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/colocataires`);
  }

  // Récupérer tous les propriétaires
  getProprietaires(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/proprietaires`);
  }

  // Récupérer tous les logements
  getLogements(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/logements`);
  }

  // Supprimer un utilisateur (colocataire ou propriétaire)
  deleteUser(cin: number, role: string){
    return this.http.delete(`${this.apiUrl}/utilisateur/${cin}/${role}`);
  }

  // Supprimer un logement
  deleteLogement(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/logements/${id}`);
  }
}
