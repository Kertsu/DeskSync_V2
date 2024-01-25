import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SidebarModule,
    ButtonModule,
    AvatarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
