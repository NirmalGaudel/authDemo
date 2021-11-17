import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { SignupComponent } from './modules/auth/signup/signup.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthComponent } from './modules/auth/auth.component';
import { AdminPanelComponent } from './modules/admin-panel/admin-panel.component';
import { DashboardComponent } from './modules/admin-panel/components/dashboard/dashboard.component';
import { UsersComponent } from './modules/admin-panel/components/users/users.component';
import { MaintenanceComponent } from './modules/admin-panel/components/maintenance/maintenance.component';
import { ProfileComponent } from './modules/admin-panel/components/profile/profile.component';
import { UsersTableComponent } from './modules/admin-panel/components/users-table/users-table.component';
import { RoleGuard } from './guards/role.guard';
import { EventsComponent } from './modules/admin-panel/components/events/events.component';
import { CategoriesComponent } from './modules/admin-panel/components/categories/categories.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent,
    data: { breadcrum: 'home' },
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        data: { breadcrum: 'dashboard' },
        component: DashboardComponent,
      },

      {
        path: 'profile',
        data: { breadcrum: 'profile' },
        component: ProfileComponent,
      },

      {
        path: 'maintenance',
        data: { breadcrum: 'maintenance' },
        canActivate: [RoleGuard],
        children: [
          {
            path: '',
            data: { breadcrum: '' },
            component: MaintenanceComponent,
          },
          {
            path: 'events',
            data: { breadcrum: 'events' },
            component: EventsComponent,
          },
          {
            path: 'categories',
            data: { breadcrum: 'categories' },
            component: CategoriesComponent,
          },
          {
            path: 'users',
            data: { breadcrum: 'users' },
            component: UsersComponent,
            children: [
              {
                path: '',
                data: { breadcrum: '' },
                component: UsersTableComponent,
              },
              {
                path: ':id',
                component: ProfileComponent,
                data: { breadcrum: '' },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: 'home',
    redirectTo: '',
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
