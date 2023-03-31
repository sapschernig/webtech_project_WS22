import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { FooterComponent } from './footer/footer.component';
import { MoviecardComponent } from './moviecard/moviecard.component';
import { RoutingModule } from './routing.module';
import { LoginComponent } from './login/login.component';

import { RegisterComponent } from './register/register.component';
import { MyticketsComponent } from './mytickets/mytickets.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManagementViewComponent } from './management-view/management-view.component';
import { AddAMovieComponent } from './add-amovie/add-amovie.component';
import { AccountComponent } from './account/account.component';
import { SeatselectComponent } from './seatselect/seatselect.component';

import { AuthGuard } from './services/AuthGuard';
import { AuthService } from './services/authservice';
import { AuthInterceptor } from './services/AuthInterceptor';
import { DatePipe } from '@angular/common';
import { ManageShowtimesComponent } from './manage-showtimes/manage-showtimes.component';
import { TheaterManagementComponent } from './theater-management/theater-management.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SlideshowComponent,
    FooterComponent,
    MoviecardComponent,
    LoginComponent,
    RegisterComponent,
    MyticketsComponent,
    ManagementViewComponent,
    AddAMovieComponent,
    AccountComponent,
    SeatselectComponent,
    ManageShowtimesComponent,
    TheaterManagementComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
