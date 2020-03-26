import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../database/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.css']
})
export class OverviewPageComponent implements OnInit {
  user: firebase.User
  
  prov: any = []
  constructor(private router: Router,
    private auth: AuthService) { }

  ngOnInit() {
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

}
