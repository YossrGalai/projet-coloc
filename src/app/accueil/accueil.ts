import { Component } from '@angular/core';
import { Router, RouterOutlet ,RouterLink } from '@angular/router';

@Component({
  selector: 'app-accueil',
  imports: [RouterLink ],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class Accueil {
  constructor(private router:Router){};
  goToInscription(){
    this.router.navigate(['/inscription']);
  }
  goToConnexion(){
    this.router.navigate(['/connexion']);
  }
  goToRecherche(){
    this.router.navigate(['/recherche-logement']);
  }

}
