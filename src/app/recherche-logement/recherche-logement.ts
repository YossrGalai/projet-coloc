import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth';
import {LogementService} from '../logement/logement.service';
import {Logement} from '../logement/logement.model'
import { HttpClientModule } from '@angular/common/http';




@Component({
  selector: 'app-recherche-logement',
  standalone: true,              
  imports: [CommonModule, FormsModule,HttpClientModule],
  templateUrl: './recherche-logement.html',
  styleUrls: ['./recherche-logement.css']
})


  // Tableau de tous les logements disponibles
 export class RechercheLogement  implements OnInit {
  constructor(private router: Router,public auth: AuthService,private logementService: LogementService) {}
  
  logements: Logement[] = [];
  prixFilter?: number;
  adresseFilter?: string
  reserver(logement: any) {
    logement.reserved = !logement.reserved;
  }
  filteredLogements: any[] = [];


  // Valeurs de recherche
   searchVille: string = '';
   searchType: string = '';
   searchPrix: number | null = null;

  // Pour contrôler l’affichage des résultats
    showResults: boolean = false;

   /* applyFilter() {
  this.filteredLogements = this.logements.filter(logement => {
    const matchVille = this.searchVille
      ? logement.adresse.toLowerCase().includes(this.searchVille.toLowerCase())
      : true;

    const matchType = this.searchType
      ? logement.type === this.searchType
      : true;

    const matchPrix = this.searchPrix
      ? logement.prix <= this.searchPrix
      : true;

    return matchVille && matchType && matchPrix;
  });

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
  this.filteredLogements = [];
  this.showResults = false;
}


  retourAccueil() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    
  }
}

