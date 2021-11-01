import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { SignupComponent } from './modules/auth/signup/signup.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthComponent } from './modules/auth/auth.component';
import { AdminPanelComponent } from './modules/admin-panel/admin-panel.component';
import { DashboardComponent } from './modules/admin-panel/components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent,
    canActivate: [AuthGuard],
    children: [{ path: '', component: DashboardComponent }],
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
