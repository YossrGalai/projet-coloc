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
   const user = this.auth.getUserData();
   const key = `reserve_${user.cin}_${logement.id}`;
  // Toggle
  logement.reserve = !logement.reserve;
   
  // Récupérer les infos de l'utilisateur connecté
  
  const payload = {
    logementId: logement.id,
    cin: user.cin,
    role: user.role,
    date_debut: new Date().toISOString().slice(0, 10) // Format YYYY-MM-DD
  };
  // Save the single logement reservation in localStorage
  if (logement.reserve) {
    localStorage.setItem(key, 'true');
  } else {
    localStorage.removeItem(key);
  }

  // Update the full logements array in localStorage so ngOnInit can read it
  localStorage.setItem('logements', JSON.stringify(this.logements));
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
  const user = this.auth.getUserData();
  console.log("Valeurs envoyées :", this.searchVille, this.searchPrix, this.searchAdresse); 

  this.logementService.getFilteredLogements(
    this.searchPrix ?? undefined,
    this.searchVille ?? undefined,
    this.searchType ?? undefined,
    this.searchAdresse ?? undefined
  )
  .subscribe(data => {
    console.log("Données reçues du backend :", data);

    // Hide owner-accepted logements, but mark user reservations
    this.logements = data
      .filter(l => !l.reserve) // hide if owner accepted
      .map(l => {
        const key = user ? `reserve_${user.cin}_${l.id}` : '';
        l.reserve = user ? localStorage.getItem(key) === 'true' : false;
        return l;
      });

    this.showResults = true;
  });
}


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
  const user = this.auth.getUserData();

  let logements = JSON.parse(localStorage.getItem('logements') || '[]');

  if (logements.length === 0) {
    // First visit: fetch from backend
    this.logementService.getLogements().subscribe((data: Logement[]) => {
      this.logements = data
        .filter(l => !l.reserve) // hide owner-accepted
        .map(l => {
          const key = user ? `reserve_${user.cin}_${l.id}` : '';
          l.reserve = user ? localStorage.getItem(key) === 'true' : false;
          return l;
        });

      localStorage.setItem('logements', JSON.stringify(this.logements));
    });
  } else {
    // Already in localStorage
    this.logements = logements
      .filter((l:any) => !l.reserve) // hide owner-accepted
      .map((l:any) => {
        const key = user ? `reserve_${user.cin}_${l.id}` : '';
        l.reserve = user ? localStorage.getItem(key) === 'true' : false;
        return l;
      });
  }
}


}