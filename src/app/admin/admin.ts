import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-admin',
  imports: [CommonModule,HttpClientModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
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
    this.adminService.getColocataires().subscribe(data => this.colocataires = data);
    this.adminService.getProprietaires().subscribe(data => this.proprietaires = data);
    this.adminService.getLogements().subscribe(data => this.logements = data);
  }

  deleteUser(id: number, type: 'colocataire' | 'proprietaire') {
    this.adminService.deleteUser(id).subscribe(() => this.loadData());
  }

  deleteLogement(id: number) {
    this.adminService.deleteLogement(id).subscribe(() => this.loadData());
  }
}
