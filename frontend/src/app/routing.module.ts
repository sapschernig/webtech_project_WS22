import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ManagementViewComponent } from './management-view/management-view.component';
import { MoviecardComponent } from './moviecard/moviecard.component';
import { MyticketsComponent } from './mytickets/mytickets.component';
import { RegisterComponent } from './register/register.component';

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
  }
  ,
  {
    path:'management', component: ManagementViewComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class RoutingModule { }
