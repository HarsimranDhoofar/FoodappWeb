import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../database/auth/auth.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  @Output() closeModalEvent = new EventEmitter<boolean>();
  authError: any;
  constructor(private router: Router,
              private auth: AuthService,
              ) {}

  goToDashboard(){
        this.router.navigate(['/dashboard']);  // define your component where you want to go
    }
  
  ngOnInit() {
  
    this.auth.eventAuthError$.subscribe( data => {
      this.authError = data;
      
    })
  }
 createUser(frm){
      this.closeModalEvent.emit(false);
      this.auth.createUser(frm.value);
 }
 login(frm1){
  this.closeModalEvent.emit(false);
   this.auth.login(frm1.value.email, frm1.value.password);
 }

}
