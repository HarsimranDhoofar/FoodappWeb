import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../database/auth/auth.service';
import { ProviderInfo } from '../../database/auth/provider-info.model';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  prov: ProviderInfo[]
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.getEmployees().subscribe(prov =>{
      console.log(prov)
      this.prov = prov ;
      console.log(this.prov)
    })
  }
  editProviderFunc(form){
    console.log(form.value)
    this.auth.updateProvider(form.value);
  }
  imageChangedEvent: any = '';
  croppedImage: any = '';
  
  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }
  imageLoaded() {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }
 
}
