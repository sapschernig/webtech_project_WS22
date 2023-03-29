import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAMovieComponent } from './add-amovie/add-amovie.component';
import { LoginComponent } from './login/login.component';
import { ManagementViewComponent } from './management-view/management-view.component';
import { MoviecardComponent } from './moviecard/moviecard.component';
import { MyticketsComponent } from './mytickets/mytickets.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { SeatselectComponent } from './seatselect/seatselect.component';
import { AuthGuard } from './services/AuthGuard';
import { ManageShowtimesComponent } from './manage-showtimes/manage-showtimes.component';
import { TheaterManagementComponent } from './theater-management/theater-management.component';


const routes: Routes = [
  {
    path:'movies', component: MoviecardComponent
  },
  {
    path:'login', component: LoginComponent
  },
  {
    path:'register', component: RegisterComponent
  },
  {
    path:'mytickets', component: MyticketsComponent
  },
  {
    path: 'admin',
    component: ManagementViewComponent,
    //canActivate: [AuthGuard],
    data: { isAdmin: true }
  },
  {
    path: 'showtimes',
    component: ManageShowtimesComponent,
    //canActivate: [AuthGuard],
    data: { isAdmin: true }
  },
  {
    path: 'theaters',
    component: TheaterManagementComponent,
    //canActivate: [AuthGuard],
    data: { isAdmin: true }
  },
  {
    path:'addAMovie', component: AddAMovieComponent
  },
  {
    path: 'account',
    component: AccountComponent,
    //canActivate: [AuthGuard],
    data: { isAdmin: false }
    
  },
  {
    path:'seat', component: SeatselectComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule],
  providers:[AuthGuard]
})
export class RoutingModule { }
