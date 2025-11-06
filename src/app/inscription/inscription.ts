import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-inscription',
  imports: [FormsModule,CommonModule],
  templateUrl: './inscription.html',
  styleUrl: './inscription.css',
})
export class Inscription {
constructor(private router: Router) {}

  user = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  };

  errors: string[] = [];

  onSubmit() {
    this.errors = [];

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

    if (this.user.password !== this.user.confirmPassword) {
      this.errors.push("Les mots de passe ne correspondent pas.");
    }

    if (!this.user.role) {
      this.errors.push("Veuillez sélectionner un rôle.");
    }

    if (this.errors.length > 0) return;

    console.log('Inscription réussie :', this.user);
    
    this.resetForm();

    this.router.navigate(['/apropos']);
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
}
