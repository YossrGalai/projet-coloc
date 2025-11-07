import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth';

@Component({
  selector: 'app-inscription',
  imports: [FormsModule,CommonModule],
  templateUrl: './se-connecter.html',
  styleUrl: './se-connecter.css',
})
export class SeConnecter {
constructor(private router: Router,private auth: AuthService) {}

  user = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  };

  errors: string[] = [];

 role: string = '';
goNext(form: NgForm) {
  this.errors = [];

  // Marque tous les champs comme touchés pour les bordures rouges
  form.form.markAllAsTouched();

  // Vérifications
  if (!this.user.name.trim()) {
    this.errors.push("Le nom est obligatoire.");
  }
  if (!this.user.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    this.errors.push("L'adresse e-mail n'est pas valide.");
  }
  if (this.user.password.length < 6) {
    this.errors.push("Le mot de passe doit contenir au moins 6 caractères.");
  }
  if (!this.user.role) {
    this.errors.push("Veuillez sélectionner un rôle.");
  }

  // Si erreurs → stop
  if (this.errors.length > 0) return;

  console.log('Inscription réussie :', this.user);
   this.auth.setConnected(true);
  // Navigation selon le rôle
  if (this.user.role === 'colocataire') {
    this.router.navigate(['/profil']);
  } else if (this.user.role === 'proprietaire') {
    this.router.navigate(['/proprietaire']);
  }

  // Réinitialiser le formulaire
  this.resetForm();

}

resetForm() {
  this.user = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  }; 

}
retourAccueil() {
    this.router.navigate(['/']);
  }
}