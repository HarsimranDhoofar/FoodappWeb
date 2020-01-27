import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AuthService } from '../../database/auth/auth.service';
@Component({
  selector: 'app-update-menu',
  templateUrl: './update-menu.component.html',
  styleUrls: ['./update-menu.component.css']
})
export class UpdateMenuComponent implements OnInit {

  constructor(private auth: AuthService) { }
 prov: any
  ngOnInit() {
    this.auth.getMealPackageList().subscribe(prov =>{
      console.log(prov.values)
      this.prov = prov ;
      console.log(this.prov)
    })
  }

  addNewPackageNameFunc(addNewPackage){
    this.auth.addNewPackage(addNewPackage.value)
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
