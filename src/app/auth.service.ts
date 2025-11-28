import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthService {
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

  isConnected() {
    return this.connected;
  }

  getUserRole() {
    return this.role;
  }
}
