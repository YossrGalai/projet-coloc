import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logement',
  imports: [ FormsModule,CommonModule],
  templateUrl: './logement.html',
  styleUrl: './logement.css',
})
export class Logement {
    constructor(private router: Router) {}

  logement = {
    titre: '',
    adresse: '',
    prix: 0,
    description: '',
    image: ''
  };

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.logement.image = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  Enregistrer() {   
    console.log("✅ Logement ajouté :", this.logement);
    this.router.navigate(['/proprietaire']);
  }

}