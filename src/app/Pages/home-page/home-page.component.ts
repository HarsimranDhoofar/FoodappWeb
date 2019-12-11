import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  authError: any;
  constructor(private router: Router,
              private auth: AuthService) {}

  goToDashboard(){
        this.router.navigate(['/dashboard']);  // define your component where you want to go
    }
  
  ngOnInit() {
  
    this.auth.eventAuthError$.subscribe( data => {
      this.authError = data;
      
    })
  }
 createUser(frm){
      this.auth.createUser(frm.value);
 }
 login(frm){
   this.auth.login(frm.value.emailLogin, frm.value.passwordLogin);
 }

}
