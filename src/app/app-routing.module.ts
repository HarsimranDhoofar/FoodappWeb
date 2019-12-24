import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { EditProfileComponent } from './Pages/dashboard/edit-profile/edit-profile.component';
import { OverviewPageComponent } from './Pages/dashboard/overview-page/overview-page.component';
import { UpdateMenuComponent } from './Pages/dashboard/update-menu/update-menu.component';
import { CustomerListComponent } from './Pages/dashboard/customer-list/customer-list.component';
const routes: Routes = [
   { 
    path: '', 
    component:HomePageComponent
   },
   { 
     path: 'dashboard', 
     component:DashboardComponent,
     children: [
      { path: '', redirectTo: 'overView', pathMatch: 'full' },
      {
        path: 'overView',
        component: OverviewPageComponent
       },
       {
        path: 'updateMenu',
        component: UpdateMenuComponent
       },
       {
        path: 'customerList',
        component: CustomerListComponent
       },
       {
        path: 'editProfile',
        component: EditProfileComponent
       }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
