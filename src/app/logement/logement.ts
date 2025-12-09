import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogementService } from './logement.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-logement',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './logement.html',
  styleUrls: ['./logement.css']
})
export class Logement {

  logementForm: FormGroup;
  preview: string | null = null;

  constructor(
    private router: Router,
    private logementService: LogementService,
    private auth: AuthService,
    private fb: FormBuilder
  ) {
    // Initialisation du formulaire dans le constructeur
    this.logementForm = this.fb.group({
      titre: ['', Validators.required],
      adresse: ['', Validators.required],
      ville: ['', Validators.required],
      prix: [0, [Validators.required, Validators.min(0)]],
      nbchambres: [0, [Validators.required, Validators.min(0)]],
      superficie: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      type: ['', Validators.required],
      photo: ['']
    });
  }

  // ----------------------------
  // Gestion de l'image et prévisualisation
  // ----------------------------
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
      this.logementForm.patchValue({ photo: this.preview });
    };
    reader.readAsDataURL(file);
  }

  // ----------------------------
  // Soumission du formulaire
  // ----------------------------
  Enregistrer() {
    if (this.logementForm.invalid) {
      this.logementForm.markAllAsTouched();
      return;
    }

    const user = this.auth.getUserData();
    const f = this.logementForm.value;

    const payload = {
      ...f,
      titre: f.titre!.substring(0, 150),
      adresse: f.adresse!.substring(0, 255),
      ville: f.ville!.substring(0, 100),
      description: f.description!.substring(0, 255),
      type: f.type!.substring(0, 50),
      image: f.photo?.substring(0, 255) || ''
    };

    this.logementService.ajouterLogement(payload, user.cin).subscribe({
      next: () => {
        console.log("✅ Logement enregistré dans la BD");
        this.router.navigate(['/proprietaire']);
      },
      error: err => console.error("❌ Erreur lors de l’ajout", err)
    });
  }
}
