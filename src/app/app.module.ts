import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppLayoutModule } from './layout/app.layout.module';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessagesModule } from 'primeng/messages';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SpeedDialModule } from 'primeng/speeddial';
import { ChartModule } from 'primeng/chart';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TimelineModule } from 'primeng/timeline';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ChipModule } from 'primeng/chip';
import { StepsModule } from 'primeng/steps';
import { TabViewModule } from 'primeng/tabview';
import { ImageModule } from 'primeng/image';
import { PasswordModule } from 'primeng/password';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { LoginComponent } from './pages/login/login.component';
import { FormLinksComponent } from './components/form-links/form-links.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authInterceptor } from './services/token.interceptor';
import { LandingComponent } from './pages/landing/landing.component';
import { FeaturesComponent } from './pages/features/features.component';
import { AboutComponent } from './pages/about/about.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { BookComponent } from './pages/book/book.component';
import { LogsComponent } from './pages/logs/logs.component';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';
import { ManageReservationsComponent } from './pages/manage-reservations/manage-reservations.component';
import { ManageDesksComponent } from './pages/manage-desks/manage-desks.component';
import { ManageDeskUnavailabilitiesComponent } from './pages/manage-desk-unavailabilities/manage-desk-unavailabilities.component';
import { FaqsComponent } from './pages/faqs/faqs.component';
import { GuidesComponent } from './pages/guides/guides.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { Step1Component } from './components/step-1/step-1.component';
import { Step2Component } from './components/step-2/step-2.component';
import { Step3Component } from './components/step-3/step-3.component';
import { ActiveUserComponent } from './components/active-user/active-user.component';
import { VerificationComponent } from './pages/verification/verification.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SuccessResetComponent } from './pages/success-reset/success-reset.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const config: SocketIoConfig = {
  // url: 'https://hdbsv2.onrender.com', options: {transports: ['websocket']}
  url: 'http://localhost:8000',
  options: { transports: ['websocket'] },
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FormLinksComponent,
    DashboardComponent,
    LandingComponent,
    FeaturesComponent,
    AboutComponent,
    PrivacyPolicyComponent,
    TermsAndConditionsComponent,
    BookComponent,
    LogsComponent,
    ManageUsersComponent,
    ManageReservationsComponent,
    ManageDesksComponent,
    ManageDeskUnavailabilitiesComponent,
    FaqsComponent,
    GuidesComponent,
    ProfileComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    ActiveUserComponent,
    VerificationComponent,
    ResetPasswordComponent,
    SuccessResetComponent,
    ForgotPasswordComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SidebarModule,
    ButtonModule,
    AvatarModule,
    StyleClassModule,
    RippleModule,
    TableModule,
    HttpClientModule,
    ProgressSpinnerModule,
    MessagesModule,
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    AppLayoutModule,
    BadgeModule,
    OverlayPanelModule,
    SpeedDialModule,
    ChartModule,
    CalendarModule,
    DropdownModule,
    TimelineModule,
    DividerModule,
    TagModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    DialogModule,
    ConfirmDialogModule,
    RatingModule,
    RadioButtonModule,
    InputNumberModule,
    InputSwitchModule,
    ChipModule,
    StepsModule,
    TabViewModule,
    ImageModule,
    PasswordModule,
    InputTextareaModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [provideHttpClient(withInterceptors([authInterceptor]))],
  bootstrap: [AppComponent],
})
export class AppModule {}
