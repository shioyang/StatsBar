import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MdCheckboxModule, MdSelectModule } from '@angular/material'

import { AppComponent } from './app.component';
import { SbService } from './sb.service';
import { PlaylistComponent } from './playlist/playlist.component';
import { WelcomeComponent } from './welcome/welcome.component';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'playlist/:playlistId', component: PlaylistComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    PlaylistComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MdCheckboxModule, 
    MdSelectModule 
  ],
  providers: [SbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
