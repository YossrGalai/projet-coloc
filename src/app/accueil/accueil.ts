import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-accueil',
  imports: [],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class Accueil {
  constructor(private router:Router){};
  goToInscription(){
    this.router.navigate(['/inscription']);
  }
  goToseConnecter(){
    this.router.navigate(['/se-connecter']);
  }
  goToRecherche(){
    this.router.navigate(['/recherche-logement']);
  }

}
