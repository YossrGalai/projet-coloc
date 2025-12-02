
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inscription',
  imports: [FormsModule,CommonModule],
  templateUrl: './se-connecter.html',
  styleUrl: './se-connecter.css',
})
export class SeConnecter {
constructor(private router: Router, private http: HttpClient,private auth: AuthService) {}

  user = {
    nom: '',
    email: '',
    mot_de_passe: '',
    role: ''
  };

  errors: string[] = [];

 role: string = '';
goNext(form: NgForm) {
  this.errors = [];

  // Marque tous les champs comme touchés pour les bordures rouges
  form.form.markAllAsTouched();

  // Vérifications
  if (!this.user.nom.trim()) {
    this.errors.push("Le nom est obligatoire.");
  }
  if (!this.user.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    this.errors.push("L'adresse e-mail n'est pas valide.");
  }
  if (this.user.mot_de_passe.length < 6) {
    this.errors.push("Le mot de passe doit contenir au moins 6 caractères.");
  }
  if (!this.user.role) {
    this.errors.push("Veuillez sélectionner un rôle.");
  }

  // Si erreurs → stop
  if (this.errors.length > 0) return;

  const url = this.user.role === "proprietaire"
      ? "http://localhost:3000/api/se-connecter/proprietaire"
      : "http://localhost:3000/api/se-connecter/profil";

    this.http.post(url, this.user).subscribe(
      (res: any) => {
        console.log('Réponse backend :', res);
        if (res && res.success) {
          this.auth.setUserData(res.data);
          this.auth.setUserRole(res.data.role);
          if (res.data.role === 'proprietaire') this.router.navigate(['/proprietaire']);
          else this.router.navigate(['/profil']);
          this.resetForm();
        } else {
          this.errors.push("Email ou mot de passe incorrect.");
        }
      },
      err => this.errors.push("Erreur serveur ou email/mot de passe incorrect.")
    );

/* il faut l enlever 
  console.log('Inscription réussie :', this.user);
   this.auth.setConnected(true);
  // Navigation selon le rôle
  if (this.user.role === 'colocataire') {
    this.router.navigate(['/profil']);
  } else if (this.user.role === 'proprietaire') {
    this.router.navigate(['/proprietaire']);
  }
*/
  

  
}

resetForm() {
  this.user = {
    nom: '',
    email: '',
    mot_de_passe: '',
    role: ''
  }; 

}
retourAccueil() {
    this.router.navigate(['/']);
  }
}
