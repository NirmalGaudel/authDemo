import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MaterialUIModule } from '../material-ui/material-ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { UsersComponent } from './components/users/users.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BreadcrumComponent } from './components/breadcrum/breadcrum.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EventsComponent } from './components/events/events.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AddCategoryComponent } from './components/categories/add-category/add-category.component';
import { MatIconRegistry } from '@angular/material/icon';

@NgModule({
  declarations: [
    AdminPanelComponent,
    DashboardComponent,
    HeaderComponent,
    SideNavbarComponent,
    UsersComponent,
    MaintenanceComponent,
    BreadcrumComponent,
    UsersTableComponent,
    ProfileComponent,
    EventsComponent,
    CategoriesComponent,
    AddCategoryComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MaterialUIModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [],
})
export class AdminPanelModule {
  constructor(private iconReg: MatIconRegistry) {
    iconReg.setDefaultFontSetClass('material-icons-outlined');
  }
}
