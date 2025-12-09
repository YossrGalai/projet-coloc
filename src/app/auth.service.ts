import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private router: Router) {} 
  private connected = false;
  private role: string = '';
  private userData: any = null;

  setConnected(state: boolean) {
    this.connected = state;
  }

  setUserRole(role: string) {
    this.role = role;
  }

  setUserData(data: any) {
    this.userData = data;
  }

  getUserData() {
    return this.userData;
  }

 isConnected(): boolean {
    const stored = localStorage.getItem('connected');
    return stored === 'true' || this.connected;
  }
  getUserRole() {
    return this.role;
  }
    logout() {
    this.connected = false;
    this.role = '';
    localStorage.removeItem('connected');
    localStorage.removeItem('role');
    this.router.navigate(['/']);
  }
}
