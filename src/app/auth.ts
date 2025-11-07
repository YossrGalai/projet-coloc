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
}
