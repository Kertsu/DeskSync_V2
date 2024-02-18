import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BookComponent } from './pages/book/book.component';
import { Step1Component } from './components/step-1/step-1.component';
import { Step2Component } from './components/step-2/step-2.component';
import { Step3Component } from './components/step-3/step-3.component';
import { FaqsComponent } from './pages/faqs/faqs.component';
import { GuidesComponent } from './pages/guides/guides.component';
import { LogsComponent } from './pages/logs/logs.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';
import { ManageReservationsComponent } from './pages/manage-reservations/manage-reservations.component';
import { ManageDeskUnavailabilitiesComponent } from './pages/manage-desk-unavailabilities/manage-desk-unavailabilities.component';
import { authGuard, guestGuard, hasAccess, isAdmin } from './shared/auth.guard';
import { ManageDesksComponent } from './pages/manage-desks/manage-desks.component';
import { VerificationComponent } from './pages/verification/verification.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { SuccessResetComponent } from './pages/success-reset/success-reset.component';
import { SendOtpComponent } from './pages/send-otp/send-otp.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/login'},
  {
    path: 'login',
    component: LoginComponent, canActivate:[authGuard]
  },
  {
    path: 'verification', component: VerificationComponent, canActivate: [authGuard]
  },
  {
    path: 'change-password', component: ChangePasswordComponent, canActivate: [authGuard]
  },
  {
    path: 'send-otp', component: SendOtpComponent, canActivate: [authGuard]
  },
  {
    path: 'changed-password', component: SuccessResetComponent, canActivate: [authGuard]
  },
  {
    path: 'hdbsv2',
    canActivate: [guestGuard],
    component: AppLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'book',
        component: BookComponent,
        children: [
          { path: '', redirectTo: 'office-area', pathMatch: 'full' },
          { path: 'office-area', component: Step1Component },
          {
            path: 'desk-area',
            component: Step2Component,
          },
          {
            path: 'confirmation',
            component: Step3Component,
          },
        ],
      },
      { path: 'logs', component: LogsComponent, canActivate: [isAdmin] },
      { path: 'manage-users', component: ManageUsersComponent, canActivate: [isAdmin]  },
      { path: 'manage-reservations', component: ManageReservationsComponent, canActivate: [hasAccess]  },
      { path: 'manage-desks', component: ManageDesksComponent, canActivate: [hasAccess]  },
      {
        path: 'manage-unavailabilities',
        component: ManageDeskUnavailabilitiesComponent, canActivate: [hasAccess] 
      },
      { path: 'faqs', component: FaqsComponent },
      { path: 'guides', component: GuidesComponent },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
