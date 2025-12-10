import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-admin',
  imports: [CommonModule,FormsModule],
  templateUrl: './login-admin.html',
  styleUrl: './login-admin.css',
})
export class LoginAdmin {
  email: string = '';
  password = '';
  errorMessage: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    if (this.email === 'admin@mail.com' && this.password === 'admin123') {
      this.auth.setConnected(true);
      this.auth.setUserRole('admin');
      this.router.navigate(['/admin']);
    } else {
      this.errorMessage = 'Email ou mot de passe incorrect';
    }
  }
}
