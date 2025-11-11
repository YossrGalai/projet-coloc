import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private connected = false;
  private role: string = '';

  setConnected(value: boolean) {
    this.connected = value;
    localStorage.setItem('connected', value.toString());
  }

  isUserConnected(): boolean {
    const stored = localStorage.getItem('connected');
    return stored === 'true' || this.connected;
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
  }
}
