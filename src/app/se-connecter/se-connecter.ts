import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-se-connecter',
  imports: [FormsModule],
  templateUrl: './se-connecter.html',
  styleUrl: './se-connecter.css',
})
export class SeConnecter {
    onSubmit() {
    console.log("Formulaire soumis !");
  }

  constructor(private router: Router) {}

  retourAccueil() {
    this.router.navigate(['/']);
  }

}
