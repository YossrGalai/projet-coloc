import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AdminDashboard } from '../admin-dashboard/admin-dashboard';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, HttpClientModule,AdminDashboard,FormsModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css'],
  providers: [AdminService]
})
export class Admin implements OnInit {
  colocataires: any[] = [];
  proprietaires: any[] = [];
  logements: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.adminService.getColocataires().subscribe(data => {
      // ajouter le role si le backend ne le renvoie pas
      this.colocataires = data.map(u => ({ ...u, role: 'colocataire' }));
    });
    this.adminService.getProprietaires().subscribe(data => {
      this.proprietaires = data.map(u => ({ ...u, role: 'proprietaire' }));
    });
    this.adminService.getAllLogements().subscribe(data => this.logements = data);
  }

  deleteUser(cin: number, role: 'colocataire' | 'proprietaire') {
    this.adminService.deleteUser(cin, role).subscribe({
      next: () => {
        console.log(`Utilisateur ${cin} (${role}) supprimé`);

        if (role === 'colocataire') {
          this.colocataires = this.colocataires.filter(u => u.CIN !== cin);
        } 
        else if (role === 'proprietaire') {
          this.proprietaires = this.proprietaires.filter(u => u.CIN !== cin);
        }

        // pas obligatoire mais OK
        this.loadData();
      },
      error: err => {
        console.error('Erreur suppression utilisateur', err);
        alert('Erreur lors de la suppression : ' + err.message);
      }
    });
  }
  
  deleteLogement(id: number) {
    this.adminService.deleteLogement(id).subscribe(() => this.loadData());
  }
}
