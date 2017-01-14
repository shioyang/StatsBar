import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SbService } from './sb.service';
import { PlaylistComponent } from './playlist/playlist.component';

const appRoutes: Routes = [
  { path: 'playlist/:playlistId', component: PlaylistComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PlaylistComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [SbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
