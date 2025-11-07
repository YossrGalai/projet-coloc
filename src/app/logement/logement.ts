import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-logement',
  imports: [ FormsModule],
  templateUrl: './logement.html',
  styleUrl: './logement.css',
})
export class Logement {
    constructor(private router: Router) {}

  logement = {
    titre: '',
    adresse: '',
    prix: null,
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
