import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-apropos',
  imports: [],
  templateUrl: './apropos.html',
  styleUrl: './apropos.css',
})
export class Apropos {
  constructor(private router: Router) {}

  retourAccueil() {
    this.router.navigate(['/']);
  }
}


