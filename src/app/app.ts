import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { Profil } from './profil/profil';

@Component({
  selector: 'app-root',
  imports: [RouterModule,RouterOutlet,RouterLink,RouterLinkActive,Profil],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}

