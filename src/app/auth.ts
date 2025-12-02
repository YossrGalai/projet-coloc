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
 

  isUserConnected(): boolean {
      return this.connected;
  }

  setUserRole(role: string) {
    this.role = role;
    localStorage.setItem('role', role);
  }

  getUserRole(): string {
    return localStorage.getItem('role') || this.role;
  }

  logout() {
    this.connected = false;
    this.role = '';
    localStorage.removeItem('connected');
    localStorage.removeItem('role');
    this.router.navigate(['/']);
  }
}
