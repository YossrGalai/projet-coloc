import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservationService } from '../services/reservation.service';
import { AuthService } from '../auth'; 

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './profil.html',
  styleUrls: ['./profil.css']
})
export class Profil { 

  constructor(private router: Router,public auth: AuthService,private reservationService: ReservationService) {}

  // ---- Exemple de données utilisateur (plus tard on remplacera par API / Firebase) ----
  user = {
  Cin:'14141414',  
  nom: 'Smith',
  prenom: 'John',
  email: 'john.smith@example.com',
  tel: '0612345678',
  date: '1990-05-14',
  description: '',
  photo: '"https://source.unsplash.com/150x150/?person,portrait"'
};

updateProfile() {
  alert("✅ Informations mises à jour avec succès !");
}

changePhoto() {
  alert("📸 Fonction à connecter plus tard");
}

clearPhoto() {
  this.user.photo = '';
}


  favoris = [
    { titre: 'Appartement moderne à Rabat', prix: '4500 DH/mois', image: "https://source.unsplash.com/400x300/?apartment,room"  },
    { titre: 'Studio à Agdal', prix: '3000 DH/mois', image: "https://source.unsplash.com/400x300/?studio,interior"  }
  ];

  reservations:any = [ ];
 

 ngOnInit() {
  this.reservations = this.reservationService.getReservations();
 }


  retourAccueil() {
    this.router.navigate(['/']);
  }
}
