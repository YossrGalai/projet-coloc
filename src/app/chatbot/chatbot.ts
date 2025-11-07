import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrls: ['./chatbot.css']
})
export class Chatbot {
  isOpen = false;
  userInput = '';
  messages: { sender: string; text: string }[] = [];

  faq = [
    { keywords: ['bonjour', 'salut', 'bonsoir'], answer: 'Salut 👋 ! Comment puis-je t’aider aujourd’hui ?' },
    { keywords: ['merci'], answer: 'Avec plaisir 😊 ! Si tu as d’autres questions, n’hésite pas.' },
    { keywords: ['loyer', 'payer', 'prix'], answer: 'Le loyer doit être payé avant le 5 de chaque mois, par virement bancaire.' },
    { keywords: ['retard', 'paiement'], answer: 'En cas de retard de paiement, préviens le propriétaire le plus tôt possible.' },
    { keywords: ['ménage', 'nettoyage'], answer: 'Chaque colocataire doit participer au ménage selon le planning affiché.' },
    { keywords: ['wifi', 'internet'], answer: 'Le Wi-Fi est inclus dans le loyer. Le mot de passe est affiché dans le salon.' },
    { keywords: ['règle', 'règlement'], answer: 'Les règles de la colocation sont disponibles dans la section “Règlement intérieur”.' },
    { keywords: ['invité', 'visite'], answer: 'Les invités sont autorisés occasionnellement, mais il faut prévenir les autres colocataires.' },
    { keywords: ['animal', 'chat', 'chien'], answer: 'Les animaux sont autorisés seulement avec accord de tous les colocataires.' },
    { keywords: ['machine', 'laver'], answer: 'La machine à laver est dans la buanderie. Ne pas l’utiliser après 22h.' },
    { keywords: ['contrat', 'document'], answer: 'Ton contrat est disponible dans ton profil, section “Documents”.' },
    { keywords: ['quitter', 'départ'], answer: 'Préviens 30 jours à l’avance si tu veux quitter la colocation.' },
    { keywords: ['urgence', 'problème'], answer: 'En cas d’urgence, appelle le 198 (pompiers) ou le 190 (ambulance).' },
 ];

  toggleChat() {
    this.isOpen = !this.isOpen;

    if (!this.isOpen) {
      this.messages = [];
  }
  }

  sendMessage() {
    const userMsg = this.userInput.trim();
    if (!userMsg) return;

    this.messages.push({ sender: 'user', text: userMsg });

    const found = this.faq.find(f =>
      f.keywords.some(k => userMsg.toLowerCase().includes(k.toLowerCase()))
    );

    const botReply = found
      ? found.answer
      : "Je n'ai pas compris 😅. Pouvez-vous reformuler votre question ?";
      
    this.messages.push({ sender: 'bot', text: botReply });

    this.userInput = '';
  }
}
