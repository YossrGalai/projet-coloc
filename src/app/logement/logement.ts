import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LogementService } from './logement.service';
import { AuthService } from '../auth.service'; // pour récupérer le cin

@Component({
  selector: 'app-logement',
  imports: [ FormsModule,CommonModule],
  templateUrl: './logement.html',
  styleUrl: './logement.css',
})
export class Logement {
    constructor(private router: Router,private logementService: LogementService,private auth: AuthService) {}

  logement = {
    titre: '',
    adresse: '',
    ville:'',
    prix: 0,
    nbchambres:0,
    superficie:0,
    type:'',
    description: '',
    photo: ''
  };





  
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.logement.photo = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  
 
Enregistrer() {
  const user = this.auth.getUserData();

  const payload = {
    ...this.logement,
    titre: this.logement.titre.substring(0,150),
    adresse: this.logement.adresse.substring(0,255),
    ville: this.logement.ville.substring(0,100),
    description: this.logement.description.substring(0,255),
    type: this.logement.type.substring(0,50),
    image: this.logement.photo?.substring(0,255) || ''
  };

  this.logementService.ajouterLogement(payload, user.cin).subscribe(
    () => {
      console.log("✅ Logement enregistré dans la BD");
      this.router.navigate(['/proprietaire']);
    },
    error => {
      console.error("❌ Erreur lors de l'ajout", error);
    }
  );
}


}
