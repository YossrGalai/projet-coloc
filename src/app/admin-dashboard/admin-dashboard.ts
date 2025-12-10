import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../services/admin';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
  private adminService = inject(AdminService);

  colocatairesCount = 0;
  proprietairesCount = 0;
  logementsCount = 0;

  ngOnInit() {
    this.adminService.getColocataires()
      .subscribe(data => this.colocatairesCount = data.length);

    this.adminService.getProprietaires()
      .subscribe(data => this.proprietairesCount = data.length);

    this.adminService.getAllLogements()
      .subscribe(data => this.logementsCount = data.length);
  }
}
