import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { environment } from '../environments/environment';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { EditProfileComponent } from './Pages/dashboard/edit-profile/edit-profile.component';
import { OverviewPageComponent } from './Pages/dashboard/overview-page/overview-page.component';
import { UpdateMenuComponent } from './Pages/dashboard/update-menu/update-menu.component';
import { CustomerListComponent } from './Pages/dashboard/customer-list/customer-list.component';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    DashboardComponent,
    EditProfileComponent,
    OverviewPageComponent,
    UpdateMenuComponent,
    CustomerListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
