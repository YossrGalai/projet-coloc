import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { AuthService } from '../auth';
=======
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
>>>>>>> 942610ea2e5bc2739416b0c742b0a8d2b1108601

@Component({
  selector: 'app-inscription',
  imports: [FormsModule, CommonModule],
  templateUrl: './se-connecter.html',
  styleUrls: ['./se-connecter.css'],
})
export class SeConnecter {
<<<<<<< HEAD
constructor(private router: Router,private auth: AuthService) {}

  user = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  };
=======
  constructor(private router: Router, private http: HttpClient, private auth: AuthService) {}
>>>>>>> 942610ea2e5bc2739416b0c742b0a8d2b1108601

  user = { role: '' ,nom:'',email: '', mot_de_passe: ''};
  errors: string[] = [];

  goNext(form: NgForm) {
    this.errors = [];
    form.form.markAllAsTouched();

    if (!this.user.nom.trim()) this.errors.push("Le nom est obligatoire.");
    if (!this.user.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) this.errors.push("L'adresse e-mail n'est pas valide.");
    if (this.user.mot_de_passe.length < 6) this.errors.push("Le mot de passe doit contenir au moins 6 caractères.");
    if (!this.user.role) this.errors.push("Veuillez sélectionner un rôle.");
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
  }

  // Si erreurs → stop
  if (this.errors.length > 0) return;

  console.log('Inscription réussie :', this.user);
   this.auth.setConnected(true);
<<<<<<< HEAD
   this.auth.setUserRole(this.user.role);
=======
>>>>>>> 942610ea2e5bc2739416b0c742b0a8d2b1108601
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
  resetForm() {
    this.user = { role: '' ,nom:'',email: '', mot_de_passe: ''};
  }

  retourAccueil() {
    this.router.navigate(['/']);
  }
}
