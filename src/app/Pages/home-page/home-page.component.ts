import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../database/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { UploadServiceService } from '../database/uploadService/upload-service.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public data:any=[]
  public lottieConfig: Object;
  private anim: any;
  private animationSpeed: number = 1;
  @Output() closeModalEvent = new EventEmitter<boolean>();
  authError: any;
  url: any;
  constructor(private router: Router,
              private auth: AuthService,
              private uploadService: UploadServiceService,
              private afStorage: AngularFireStorage,
              private spinner: NgxSpinnerService,
              @Inject(LOCAL_STORAGE) private storage: WebStorageService) {}

  goToDashboard(){
        this.router.navigate(['/dashboard']);  // define your component where you want to go
    }

  ngOnInit() {
    this.lottieConfig = {
      path: 'https://assets3.lottiefiles.com/packages/lf20_2rzKDg.json',
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

uploadimage:any ='';
ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;

fileChangeEvent(event: any): void {
  this.uploadimage = event.target.files[0];
}
getFromLocal(key): void {
  console.log('recieved= key:' + key);
  this.data= this.storage.get(key);
  console.log(this.data);
 }
}
