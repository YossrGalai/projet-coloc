import { Component, signal } from '@angular/core';
import {  RouterOutlet  } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Chatbot } from './chatbot/chatbot';  
<<<<<<< HEAD
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule,Chatbot],
=======
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule,Chatbot,HttpClientModule],
>>>>>>> 942610ea2e5bc2739416b0c742b0a8d2b1108601
  standalone: true,    
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('projet-coloc');
  
}

