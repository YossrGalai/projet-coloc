import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth';
import {LogementService} from '../logement/logement.service';
import {Logement} from '../logement/logement.model'
import { HttpClientModule } from '@angular/common/http';
import { ReservationService } from '../services/reservation.service';
import { RouterModule } from '@angular/router';





@Component({
  selector: 'app-recherche-logement',
  standalone: true,              
  imports: [CommonModule, FormsModule,HttpClientModule,RouterModule],
  templateUrl: './recherche-logement.html',
  styleUrls: ['./recherche-logement.css']
})


  // Tableau de tous les logements disponibles
 export class RechercheLogement  implements OnInit {
  constructor(private router: Router,public auth: AuthService,private logementService: LogementService,private reservationService: ReservationService,) {}
  
  logements: Logement[] = [];
  reserver(logement: any) {
  logement.reserve = !logement.reserve;
  const newValue = logement.reserve ? "Y" : "N";
   console.log("New reserve value for DB:", newValue);

  // 3. Envoyer la mise à jour au backend
  this.logementService.updateReserve(logement.id, newValue)
    .subscribe(() => {
      const stored = JSON.parse(localStorage.getItem('logements') || '[]');
      const index = stored.findIndex((l: any) => l.id === logement.id);

      if (index !== -1) {
        stored[index].reserve = logement.reserve;
        localStorage.setItem('logements', JSON.stringify(stored));
      }
      if (logement.reserve) {
        this.reservationService.addReservation(logement);
        alert("Réservation ajoutée !");
      } else {
        this.reservationService.removeReservation(logement.titre);
        alert("Réservation annulée !");
      }

    });
}
 


  // Valeurs de recherche
   searchVille: string | null= null;
   searchType: string | null = null;
   searchPrix: number | null = null;

  // Pour contrôler l’affichage des résultats
    showResults: boolean = false;

   /* applyFilter() {
  this.filteredLogements = this.logements.filter(logement => {
    const matchVille = this.searchVille
      ? logement.adresse.toLowerCase().includes(this.searchVille.toLowerCase())
      : true;

applyFilter() { 
  console.log("Valeurs envoyées :", this.searchVille, this.searchPrix); 
  this.logementService.getFilteredLogements(this.searchPrix ?? undefined, this.searchVille ?? undefined, this.searchType ?? undefined) 
  .subscribe(data => 
    { console.log("Données reçues du backend :", data);
     this.logements = data.filter(l => l.reserve === false);
     this.showResults = true; // on affiche la section 
 }); }

/*
  applyFilter() {
    this.logementService.getFilteredLogements(
      this.searchPrix ?? undefined,
      this.searchVille ?? undefined,
      this.searchType ?? undefined
    ).subscribe(data => {
      console.log('Data from backend:', data); 
      this.logements = data.filter(l => l.reserve === true);
      this.showResults = true;
    });
  }*/



  // Afficher la section résultats
  this.showResults = true;
}*/
applyFilter() {
  this.logementService.getFilteredLogements(this.prixFilter, this.adresseFilter)
    .subscribe(data => {
      console.log("Données reçues du backend :", data);
      this.logements = data;   // on remplit le tableau à afficher
      this.showResults = true; // on affiche la section
    });
}



  resetSearch() {
  this.searchVille = '';
  this.searchType = '';
  this.searchPrix = null;
  this.logements = [];
  this.showResults = false;
}


  retourAccueil() {
    this.router.navigate(['/']);
  }


  ngOnInit(): void { 
   const logements = JSON.parse(localStorage.getItem('logements') || '[]');
  this.logements = logements;
    
  }




}