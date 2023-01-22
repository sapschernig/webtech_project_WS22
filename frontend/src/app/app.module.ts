import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SlideshowComponent,
    FooterComponent,
    MoviecardComponent,
    LoginComponent,
    RegisterComponent,
    MyticketsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
