import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { RouterModule, Routes } from '@angular/core'; 
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
//import { movie } from './movies/list-movies.component';
import { ListMoviesComponent } from './movies/list-movies.component';

@NgModule({
  declarations: [
    AppComponent,
    //ListMoviesComponent.ListMoviesComponent,
    ListMoviesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
