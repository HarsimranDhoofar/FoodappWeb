import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AuthService } from '../../database/auth/auth.service';
import { MealData } from '../../database/auth/meal-data.model';
@Component({
  selector: 'app-update-menu',
  templateUrl: './update-menu.component.html',
  styleUrls: ['./update-menu.component.css']
})
export class UpdateMenuComponent implements OnInit {

  constructor(private auth: AuthService) { }
 prov1: Array<object> = [];
 key: any
 dailyFood: any
 currentPackageName:any
 days: String
  ngOnInit() {
    this.auth.getMealPackageList().subscribe(prov =>{
      prov.forEach(entry => {
        console.log(entry)
        this.prov1.push(entry);  //assign the data from subscription to your class variable
      })
      // console.log(prov[1].packageName)
      //   this.prov = prov ;
      // console.log(this.prov)
    })
  }
  onPackageSelect(emp){
    console.log(emp.packageName)
    this.currentPackageName = emp.packageName
    this.auth.getMeal(emp.packageName).subscribe(dailyFood =>{
      console.log(dailyFood)
      console.log(dailyFood)
         this.dailyFood = dailyFood ;
       console.log(this.dailyFood)
  })
}
  addNewPackageNameFunc(addNewPackage){
    this.auth.addNewPackage(addNewPackage.value)
    this.prov1 =[];
  }
  addPackageContentFunc(addPackageContent){
    console.log(this.currentPackageName)
    console.log(addPackageContent.value)
    this.auth.addPackageContent(addPackageContent.value, this.currentPackageName, this.days)
  }
  day(day){
    this.days = day;
    console.log(this.days)
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
