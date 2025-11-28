import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private connected = false;
  private role: string = '';
  constructor(private router: Router) {
    const stored = localStorage.getItem('connected');
    this.connected = stored === 'true';

  }

  setConnected(value: boolean) {
    this.connected = value;
    localStorage.setItem('connected', value.toString());
  }
  logout() {
  this.connected = false;
  localStorage.removeItem('connected');
  this.router.navigate(['/']);
}

  isUserConnected(): boolean {
      return this.connected;
  }
}
