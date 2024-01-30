import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
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

import {  SocketIoModule , SocketIoConfig} from 'ngx-socket-io';

import { LoginComponent } from './pages/login/login.component';
import { FormLinksComponent } from './components/form-links/form-links.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authInterceptor } from './services/token.interceptor';
import { LandingComponent } from './pages/landing/landing.component';
import { FeaturesComponent } from './pages/features/features.component';
import { AboutComponent } from './pages/about/about.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';

const config: SocketIoConfig = {
  // url: 'https://hdbsv2.onrender.com', options: {transports: ['websocket']}
  url: 'http://localhost:8000', options: {transports: ['websocket']}
}

@NgModule({
  declarations: [AppComponent, LoginComponent, FormLinksComponent, DashboardComponent, LandingComponent, FeaturesComponent, AboutComponent, PrivacyPolicyComponent, TermsAndConditionsComponent],
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
    SocketIoModule.forRoot(config)
  ],
  providers: [provideHttpClient(withInterceptors([authInterceptor]))],
  bootstrap: [AppComponent],
})
export class AppModule {}
