import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
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
  villes: string[] = [
  'Tunis', 'Ariana', 'Manouba', 'Ben Arous',
  'Nabeul', 'Sousse', 'Monastir', 'Sfax',
  'Bizerte', 'Gabès', 'Gafsa', 'Kairouan',
  'Kasserine', 'Mahdia', 'Médenine', 'Tataouine',
  'Tozeur', 'Zaghouan', 'Kebili', 'Siliana'
  ];

  selectedLogement: any = null;
  logements: Logement[] = [];

  voirDetail(logement: any) {
  this.selectedLogement = logement; 

  }







  

  reserver(logement: any) {

  // Toggle only for the UI 
  logement.reserve = !logement.reserve;
  // Récupérer les infos de l'utilisateur connecté
  const user = this.auth.getUserData();
  const payload = {
    logementId: logement.id,
    cin: user.cin,
    role: user.role,
    date_debut: new Date().toISOString().slice(0, 10) // Format YYYY-MM-DD
  };
  if (logement.reserve) {

    // INSERT in the table RESERVER
    this.reservationService.addReservation(payload).subscribe(() => {
      alert("Réservation ajoutée !");
    });

  } else {
    // DELETE from the table RESERVER
    this.reservationService.removeReservation({ logementId: logement.id ,cin: user.cin }).subscribe(() => {
      alert("Réservation annulée !");
    });
  }
}


  // Valeurs de recherche
   searchVille: string | null= null;
   searchType: string | null = null;
   searchPrix: number | null = null;
   searchAdresse: string | null= null;

  // Pour contrôler l’affichage des résultats
    showResults: boolean = false;


applyFilter() { 
  console.log("Valeurs envoyées :", this.searchVille, this.searchPrix), this.searchAdresse; 
  this.logementService.getFilteredLogements(this.searchPrix ?? undefined, this.searchVille ?? undefined, this.searchType ?? undefined,this.searchAdresse ?? undefined) 
  .subscribe(data => 
    { console.log("Données reçues du backend :", data);
     this.logements = data.filter(l => l.reserve === false);
     this.showResults = true; // on affiche la section 
 }); }


  resetSearch() {
  this.searchVille = null;
  this.searchType = null;
  this.searchAdresse=null;
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