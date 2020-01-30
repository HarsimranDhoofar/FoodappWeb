import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../database/auth/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: firebase.User
  constructor(private router: Router,
    private auth: AuthService) { }

  ngOnInit() {
    this.auth.getUserState()
     .subscribe( user =>{
       console.log(user.email)
      this.user = user;
    });
  }
  logout(){
    this.auth.logout();
  }
 
}