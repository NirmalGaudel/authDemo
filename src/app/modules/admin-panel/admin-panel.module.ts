import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MaterialUIModule } from '../material-ui/material-ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AdminPanelComponent, DashboardComponent],
  imports: [
    CommonModule,
    MaterialUIModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [AdminPanelComponent, DashboardComponent],
})
export class AdminPanelModule {}
