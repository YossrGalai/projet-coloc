import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inscription',
  imports: [FormsModule,CommonModule],
  templateUrl: './inscription.html',
  styleUrl: './inscription.css',
})
export class Inscription {
constructor(private router: Router, private http: HttpClient) {}

  user = {
    cin: '',
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    telephone: '',
    date_naissance: ''
  };

  errors: string[] = [];

  onSubmit() {
    this.errors = [];

    // Vérifications côté client
    if (!this.user.nom.trim() || !this.user.prenom.trim()) this.errors.push("Nom et prénom obligatoires.");
    if (!this.user.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) this.errors.push("Email invalide.");
    if (this.user.password.length < 6) this.errors.push("Mot de passe trop court.");
    if (this.user.password !== this.user.confirmPassword) this.errors.push("Les mots de passe ne correspondent pas.");
    if (!this.user.role) this.errors.push("Rôle obligatoire.");
    if (!this.user.cin) this.errors.push("CIN obligatoire.");

    if (this.errors.length > 0) return;

    // Appel au backend
    const payload = {
      cin: this.user.cin,
      nom: this.user.nom,
      prenom: this.user.prenom,
      email: this.user.email,
      mot_de_passe: this.user.password, // <-- renommer ici
      role: this.user.role,
      telephone: this.user.telephone || null,
      date_naissance: this.user.date_naissance || null
    };

  this.http.post('http://localhost:3000/api/utilisateur/inscription', payload)
    .subscribe({
      next: (res: any) => {
        //alert(res.message);
        this.resetForm();
        this.router.navigate(['/recherche-logement']);
      },
      error: (err) => {
        if (err.status === 409) this.errors.push(err.error.message);
        else this.errors.push("Erreur serveur, réessayez plus tard.");
      }
    });
  }

  resetForm() {
    this.user = {
      cin: '',
      nom: '',
      prenom: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
      telephone: '',
      date_naissance: ''
    };
  }

  retourAccueil() {
    this.router.navigate(['/']);
  }
}