import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../database/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public lottieConfig: Object;
  private anim: any;
  private animationSpeed: number = 1;
  @Output() closeModalEvent = new EventEmitter<boolean>();
  authError: any;
  constructor(private router: Router,
              private auth: AuthService,
              private spinner: NgxSpinnerService) {}

  goToDashboard(){
        this.router.navigate(['/dashboard']);  // define your component where you want to go
    }
  
  ngOnInit() {
    this.lottieConfig = {
      path: 'https://assets1.lottiefiles.com/datafiles/cb81834f3b75c3d2aba9d8a58ad1f408/AE_JSON/loader1.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
    }
    this.auth.eventAuthError$.subscribe( data => {
      this.authError = data;
      
    })
  }
  newProvider(frm){
      this.auth.newProvider(frm.value);
 }
 login(frm1){
   this.auth.login(frm1.value.email, frm1.value.password);
 }
 handleAnimation(anim: any) {
  this.anim = anim;
}

stop() {
  this.anim.stop();
}

play() {
  this.anim.play();
}

pause() {
  this.anim.pause();
}

setSpeed(speed: number) {
  this.animationSpeed = speed;
  this.anim.setSpeed(speed);
}
}
