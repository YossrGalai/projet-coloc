
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-proprietaire',
   imports: [
    CommonModule,
    FormsModule, 
    
  ],
  templateUrl: './proprietaire.html',
  styleUrls: ['./proprietaire.css']
})
export class Proprietaire implements OnInit{
   imagePath: string = ""; 
   constructor(private router: Router, private auth: AuthService,private http: HttpClient) { }

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

     this.loadLogementsProprietaire(u.cin);
     this.loadReservationsProprietaire(u.cin);
    
  }

  /* LISTE DES LOGEMENTS AJOUTÉS */
  logementsAjoutes: any[] = [];

  /* DEMANDES DE RÉSERVATION */
  reservations: any[] = [];

  /* MÉTHODES */

  /*Mise a jour profil */
 updateProfile() {
  console.log("Profil mis à jour :", this.user);

  const body = {
    nom: this.user.nom,
    prenom: this.user.prenom,
    email: this.user.email,
    telephone: this.user.telephone,
    date_naissance: this.user.date_naissance
  };

  this.http.put(`http://localhost:3000/api/proprietaire/${this.user.cin}`, body)
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
/*charger les demandes de reservations */
loadReservationsProprietaire(cin: string) {
  this.http.get(`http://localhost:3000/api/proprietaire/${cin}/reservations`)
    .subscribe({
      next: (res: any) => {
        if(res.success) {
          this.reservations = res.data;
        }
      },
      error: (err: any) => {
        console.error("Erreur chargement réservations :", err);
      }
    });
}

/*charger les logements ajoutes par le proprietaire */
loadLogementsProprietaire(cin: string) {
  this.http.get<{ success: boolean, data: { titre: string, prix: number, photo: string }[] }>(`http://localhost:3000/api/proprietaire/${cin}/logements`)
    .subscribe({
      next: (res) => {
        if (res.success) {
          this.logementsAjoutes = res.data.map((l: { titre: string, prix: number, photo: string }) => ({
            ...l,
            photo: l.photo ? `http://localhost:3000/uploads/logement/${l.photo.split('/').pop()}` : 'assets/default-logement.png'
          }));
        }
      },
      error: (err) => {
        console.error("Erreur chargement logements :", err);
      }
    });
}

/*photo */
 

  clearPhoto() {
    this.user.photo = '';
  }
/*redirection vers page logement pour ajout */
  ajouterLogement() {
     this.router.navigate(['/logement']);
  }

  /*accepterReservation */
  accepterReservation(r: any) {
    this.updateStatutReservation(r.id_reservation, 'acceptée');
  }

  /* refuserReservation*/
  refuserReservation(r: any) {
    this.updateStatutReservation(r.id_reservation, 'refusée');
  }

/* mettre a jour statut reservation*/
  updateStatutReservation(id: number, statut: string) {
  this.http.put(`http://localhost:3000/api/reservation/${id}/statut`, { statut })
    .subscribe({
      next: (res: any) => {
        if(res.success) {
          alert("Statut mis à jour !");
          // mettre a jour localement pour rafraîchir le tableau sans recharger
          const index = this.reservations.findIndex(r => r.id_reservation === id);
          if(index !== -1) this.reservations[index].statut = statut;
        }
      },
      error: (err: any) => {
        console.error("Erreur mise à jour statut :", err);
      }
    });
}

  retourAccueil() {
    this.router.navigate(['/']);
  }
}


