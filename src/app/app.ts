import { Component, signal } from '@angular/core';
import {  RouterOutlet  } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Chatbot } from './chatbot/chatbot';  
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule,Chatbot,HttpClientModule],
  standalone: true,    
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('projet-coloc');
  
}

