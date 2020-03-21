import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AuthService } from '../../database/auth/auth.service';
import { MealData } from '../../database/auth/meal-data.model';
import { UploadServiceService } from '../../database/uploadService/upload-service.service';
@Component({
  selector: 'app-update-menu',
  templateUrl: './update-menu.component.html',
  styleUrls: ['./update-menu.component.css']
})
export class UpdateMenuComponent implements OnInit {

  constructor(private auth: AuthService,
    private uploadService: UploadServiceService) { }
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
    console.log(addNewPackage.value)
    this.auth.addNewPackage(addNewPackage.value)
    this.prov1 =[];
  }
 
  addPackageContentMondayFunc(addPackageContentMonday){
    console.log(addPackageContentMonday.value)
    this.auth.addPackageContentMondayAuth(addPackageContentMonday.value, this.currentPackageName)
  }
  addPackageContentTuesdayFunc(addPackageContentTuesday){
    console.log(addPackageContentTuesday.value)
    this.auth.addPackageContentTuesdayAuth(addPackageContentTuesday.value, this.currentPackageName)
  }
  addPackageContentWednesdayFunc(addPackageContentWednesday){
    console.log(addPackageContentWednesday.value)
    this.auth.addPackageContentWednesdayAuth(addPackageContentWednesday.value, this.currentPackageName)
  }
  addPackageContentThursdayFunc(addPackageContentThursday){
    console.log(addPackageContentThursday.value)
    this.auth.addPackageContentThursdayAuth(addPackageContentThursday.value, this.currentPackageName)
  }
  addPackageContentFridayFunc(addPackageContentFriday){
    console.log(addPackageContentFriday.value)
    this.auth.addPackageContentFridayAuth(addPackageContentFriday.value, this.currentPackageName)
  }
  addPackageContentSaturdayFunc(addPackageContentSaturday){
    console.log(addPackageContentSaturday.value)
    this.auth.addPackageContentSaturdayAuth(addPackageContentSaturday.value, this.currentPackageName)
  }
  addPackageContentSundayFunc(addPackageContentSunday){
    console.log(addPackageContentSunday.value)
    this.auth.addPackageContentSundayAuth(addPackageContentSunday.value, this.currentPackageName)
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
