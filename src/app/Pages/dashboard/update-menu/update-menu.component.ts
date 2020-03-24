import { Component, OnInit, Inject } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AuthService } from '../../database/auth/auth.service';
import { MealData } from '../../database/auth/meal-data.model';
import { UploadServiceService } from '../../database/uploadService/upload-service.service';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { map, finalize } from 'rxjs/operators';
@Component({
  selector: 'app-update-menu',
  templateUrl: './update-menu.component.html',
  styleUrls: ['./update-menu.component.css']
})
export class UpdateMenuComponent implements OnInit {
  public lottieConfig: Object;
  private anim: any;
  private animationSpeed: number = 1;
  uploadimage: any;
  packageImageUrl: any;
  randomid: string;
  constructor(private auth: AuthService,
    private uploadService: UploadServiceService,
    private afStorage: AngularFireStorage,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    ) { }
 prov1: Array<object> = [];
 key: any
 dailyFood: any
 currentPackageName:any
 days: String

  ngOnInit() {
    this.lottieConfig = {
      path: 'https://assets6.lottiefiles.com/packages/lf20_FRPrPy.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
  };
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
    this.auth.addNewPackage(addNewPackage.value, this.packageImageUrl);
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
  
  public data:any=[]
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  
  imageChangedEvent: any = '';
  croppedImage: any = '';
  
  fileChangeEvent(event: any): void {
    this.makeid(5);
      this.imageChangedEvent = event;
      this.uploadimage = event.target.files[0];
      this.ref = this.afStorage.ref(`Providers/${this.storage.get("userId")}/MealPackage/${this.randomid}`);
    // the put method creates an AngularFireUploadTask
    // and kicks off the upload
    
    this.task =this.ref.put(this.uploadimage);
    
    // AngularFireUploadTask provides observable
    // to get uploadProgress value
    this.uploadProgress = this.task.snapshotChanges()
    .pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100));

    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.ref.getDownloadURL().subscribe(url => {
          console.log(url);
          this.packageImageUrl = url; // <-- do what ever you want with the url..
        });
      })
    ).subscribe();
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

makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  this. randomid = result;
}


}
