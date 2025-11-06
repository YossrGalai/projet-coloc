import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,       // <-- Indique que c'est un composant standalone
  imports: [FormsModule], // <-- Ajoute FormsModule pour utiliser ngModel
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'] // <-- Met un "s" ici
})
export class Contact {

  formData = {
    Cin:'',
    Nom: '',
    Prenom: '',
    email: '',
    Tel: '',
    date: '',
    message: ''
  };

  onSubmit() {
    console.log("Formulaire envoyé :", this.formData);
    alert("Votre demande a été bien envoyée ✅ Nous vous contacterons bientôt !");
    this.formData = { Cin:'',Nom: '', Prenom:'', email: '', Tel: '', date: '', message: '' };
  }
}
