import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { EditProfileComponent } from './Pages/edit-profile/edit-profile.component';

const routes: Routes = [
  { path: '', component:HomePageComponent },
  { path: 'dashboard', component:DashboardComponent },
  { path: 'dashboard/editProfile', component:EditProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
