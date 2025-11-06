import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-proprietaire',
   imports: [
    CommonModule,
    FormsModule, 
    
  ],
  templateUrl: './proprietaire.html',
  styleUrls: ['./proprietaire.css']
})
export class Proprietaire {
   constructor(private router: Router) { }

  user = {
    Cin: '',
    nom: '',
    prenom: '',
    email: '',
    tel: '',
    date: '',
    photo: ''
  };

  /* LISTE DES LOGEMENTS AJOUTÉS */
  logementsAjoutes = [
    { titre: "Appartement Centre Ville", prix: "750", image: "assets/log1.jpg" },
    { titre: "Studio Résidence Palmier", prix: "550", image: "assets/log2.jpg" }
  ];

  /* DEMANDES DE RÉSERVATION */
  reservations = [
    { logement: "Appartement Centre Ville", date: "2025-02-01" },
    { logement: "Studio Résidence Palmier", date: "2025-02-04" }
  ];

  /* MÉTHODES */
  updateProfile() {
    console.log("Profil mis à jour :", this.user);
  }

  changePhoto() {
    console.log("Changer Photo");
  }

  clearPhoto() {
    this.user.photo = '';
  }

  ajouterLogement() {
     this.router.navigate(['/logement']);
  }

  accepterReservation(r: any) {
    console.log("Réservation acceptée :", r);
  }

  refuserReservation(r: any) {
    console.log("Réservation refusée :", r);
  }

  retourAccueil() {
    this.router.navigate(['/']);
  }
}
