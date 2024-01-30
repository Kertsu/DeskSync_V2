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

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'hdbsv2',
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
      { path: 'logs', component: LogsComponent },
      { path: 'manage-users', component: ManageUsersComponent },
      { path: 'manage-reservations', component: ManageReservationsComponent },
      { path: 'manage-desks', component: ManageReservationsComponent },
      {
        path: 'manage-unavailabilities',
        component: ManageDeskUnavailabilitiesComponent,
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
