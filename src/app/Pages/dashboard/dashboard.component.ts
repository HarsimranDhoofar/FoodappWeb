import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../database/auth/auth.service';
import { ProviderInfo } from '../database/auth/provider-info.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: firebase.User
  
  prov: any = []
  avatarImage: any
  constructor(private router: Router,
    private auth: AuthService) { }

  ngOnInit() {
    this.avatarImage = this.prov;
    this.auth.getUserState()
     .subscribe( user =>{
       console.log(user.email)
      this.user = user;
    });
    this.auth.getEmployees().subscribe(prov =>{
      console.log(prov)
      this.prov = prov ;
      console.log(this.prov)
    })
  }
  logout(){
    this.auth.logout();
  }
 
}