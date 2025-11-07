import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth';


interface Logement {
  nom: string;
  image: string;
  ville: string;
  type: string;
  pieces: number;
  prix: number;
}

@Component({
  selector: 'app-recherche-logement',
  standalone: true,              
  imports: [CommonModule, FormsModule],
  templateUrl: './recherche-logement.html',
  styleUrls: ['./recherche-logement.css']
})


  // Tableau de tous les logements disponibles
 export class RechercheLogement {
  constructor(private router: Router,public auth: AuthService) {}
  logements = [
    {
      nom: 'Appartement cosy à La Marsa',
      ville: 'La Marsa',
      type: 'Appartement',
      image: 'assets/images/appart1.jpg',
      pieces: 3,
      prix: 800,
      reserved: false
    },
    {
      nom: 'Studio moderne à Tunis Centre',
       ville: 'Ariana',
      type: 'Maison',
      image: 'assets/images/appart2.jpg',
      pieces: 1,
      prix: 500,
      reserved: false
    },
    {
      nom: 'Maison spacieuse à Ariana',
      ville: 'Tunis Centre',
      type: 'Studio',
      image: 'assets/images/appart3.jpg',
      pieces: 5,
      prix: 1200,
      reserved: false
    }
  ];

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

    applyFilter() {
  this.filteredLogements = this.logements.filter(logement => {
    const matchVille = this.searchVille
      ? logement.ville.toLowerCase().includes(this.searchVille.toLowerCase())
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
}

