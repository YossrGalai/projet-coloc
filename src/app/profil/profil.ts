import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './profil.html',
  styleUrls: ['./profil.css']
})
export class Profil implements OnInit{

  constructor(private router: Router, private auth: AuthService,private http: HttpClient ) {}
  user = {
    cin: '',
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    date_naissance: '',
    photo: ''
  };
   ngOnInit() {
    const u = this.auth.getUserData();

    this.user.cin = u.cin;
    this.user.nom = u.nom;
    this.user.prenom = u.prenom;
    this.user.email = u.email;
    this.user.telephone = u.telephone;
    this.user.date_naissance = u.date_naissance;
    this.user.photo = u.photo ? `http://localhost:3000${u.photo}` : '';
    this.loadReservations(u.cin);
   console.log('User image:', this.user.photo);
    
  }
  

updateProfile() {
  console.log("Profil mis à jour :", this.user);

  const body = {
    nom: this.user.nom,
    prenom: this.user.prenom,
    email: this.user.email,
    telephone: this.user.telephone,
    date_naissance: this.user.date_naissance
  };

  this.http.put(`http://localhost:3000/api/colocataire/${this.user.cin}`, body)

    .subscribe({
      next: (res: any) => {
        console.log("Réponse serveur :", res);
        alert("Profil mis à jour !");
      },
      error: (err) => {
        console.error("❌ Erreur HTTP :", err);
      }
    });
}






clearPhoto() {
  this.user.photo = '';
}


 reservations: any[] = [];

  

  retourAccueil() {
    this.router.navigate(['/']);
  }

  loadReservations(cin: string) {
  this.http.get(`http://localhost:3000/api/colocataire/${cin}/reservations`)

    .subscribe({
      next: (res: any) => {
        if (res.success) {
          this.reservations = res.data;
        }
      },
      error: (err: any) => {
        console.error("Erreur chargement réservations :", err);
      }
    });
}
}