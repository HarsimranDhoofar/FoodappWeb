import { Injectable, Inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { $ } from 'protractor';
import { ProviderInfo } from './provider-info.model';
import { MealData } from './meal-data.model';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public data:any=[]

  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
  newProviderVar: any;
  constructor(
    private afAuth: AngularFireAuth,
    private db:AngularFirestore,
    private router: Router,
    private toastr: ToastrService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

    getUserState(){
     return this.afAuth.authState;
    }

    login(email: string, password: string){
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
       .catch(error =>{
        this.eventAuthError.next(error);
       })
       .then(userCredential =>{
         if(userCredential){
          this.saveInLocal("userId", userCredential.user.uid)
           //uid = userCredential.user.uid
           console.log(this.afAuth.auth.currentUser);
           
           this.router.navigate(['/dashboard'])
           this.toastr.success('Successfull','Login')
         }
       })
    }
    newProvider(provider){
      this.afAuth.auth.createUserWithEmailAndPassword( provider.email, provider.password)
      .then( userCredential => {
         this.newProviderVar = provider

         userCredential.user.updateProfile({
          displayName: provider.serviceName
         });

         this.insertUserData(userCredential).then(() =>{
           this.router.navigate(['/dashboard'])
         });
      })
      .catch(error => {
        this.eventAuthError.next(error)
      })
    }
    insertUserData( userCredential: firebase.auth.UserCredential){
      return this.db.doc(`Providers/${userCredential.user.uid}`).set({
        uid: userCredential.user.uid,
        serviceName:this.newProviderVar.serviceName,
        address: this.newProviderVar.address,
        phone: this.newProviderVar.phone,
        email: this.newProviderVar.email,
        cuisine:"",
        deliveryRadius:"",
        meals:"",
        avatarImage:""
      })
    }

    logout(){
      return this.afAuth.auth.signOut();
    }
    getEmployees() {
      return this.db.doc(`Providers/${this.storage.get("userId")}`).valueChanges() as Observable<ProviderInfo[]>;
   }
   updateProvider(data){
      this.db.doc(`Providers/${this.storage.get("userId")}`).update({
        uid: this.getFromLocal("userId"),
        serviceName:data.serviceName,
        address: data.address,
        phone: data.phone,
        email: data.email,
        cuisine:"",
        deliveryRadius:"",
        meals:"",
        avatarImage:""
      });
      this.toastr.success('Updated','Profile')
   }
   addNewPackage(addNewPackage: any) {
    this.db.collection(`Providers`).doc(`${this.storage.get("userId")}`).collection(`mealPackage`).doc(`${addNewPackage.packageName}`).set({
      packageName:addNewPackage.packageName,
      price:addNewPackage.packagePrice,
      monday:"No Meal. Please Click on Edit Button to add what you want to give your customers on Monday -->",
      tuesday:"No Meal. Please Click on Edit Button to add what you want to give your customers on Tuesday -->",
      wednesday:"No Meal. Please Click on Edit Button to add what you want to give your customers on Wednesday -->",
      thursday:"No Meal. Please Click on Edit Button to add what you want to give your customers on Thursday -->",
      friday:"No Meal. Please Click on Edit Button to add what you want to give your customers on Friday -->",
      saturday:"No Meal. Please Click on Edit Button to add what you want to give your customers on Saturday -->",
      sunday:"No Meal. Please Click on Edit Button to add what you want to give your customers on Sunday -->"
    });

  }
  addPackageContentMondayAuth(addPackageContentMonday: any, currentPackageName){
    this.db.collection(`Providers`).doc(`${this.storage.get("userId")}`).collection(`mealPackage`).doc(`${currentPackageName}`).update({
      monday: addPackageContentMonday.packageContentMonday
    });
    this.toastr.success('Updated','Meal')
  }
  addPackageContentTuesdayAuth(addPackageContentTuesday: any, currentPackageName){
    this.db.collection(`Providers`).doc(`${this.storage.get("userId")}`).collection(`mealPackage`).doc(`${currentPackageName}`).update({
      tuesday: addPackageContentTuesday.addPackageContentTuesday
    });
    this.toastr.success('Updated','Meal')
  }
  addPackageContentWednesdayAuth(addPackageContentWednesday: any, currentPackageName){
    this.db.collection(`Providers`).doc(`${this.storage.get("userId")}`).collection(`mealPackage`).doc(`${currentPackageName}`).update({
      wednesday: addPackageContentWednesday.packageContentWednesday
    });
    this.toastr.success('Updated','Meal')
  }
  addPackageContentThursdayAuth(addPackageContentThursday: any, currentPackageName){
    this.db.collection(`Providers`).doc(`${this.storage.get("userId")}`).collection(`mealPackage`).doc(`${currentPackageName}`).update({
      thursday: addPackageContentThursday.packageContentThursday
    });
    this.toastr.success('Updated','Meal')
  }
  addPackageContentFridayAuth(addPackageContentFriday: any, currentPackageName){
    this.db.collection(`Providers`).doc(`${this.storage.get("userId")}`).collection(`mealPackage`).doc(`${currentPackageName}`).update({
      friday: addPackageContentFriday.packageContentFriday
    });
    this.toastr.success('Updated','Meal')
  }
  addPackageContentSaturdayAuth(addPackageContentSaturday: any, currentPackageName){
    this.db.collection(`Providers`).doc(`${this.storage.get("userId")}`).collection(`mealPackage`).doc(`${currentPackageName}`).update({
      saturday: addPackageContentSaturday.packageContentSaturday
    });
    this.toastr.success('Updated','Meal')
  }
  addPackageContentSundayAuth(addPackageContentSunday: any, currentPackageName){
    this.db.collection(`Providers`).doc(`${this.storage.get("userId")}`).collection(`mealPackage`).doc(`${currentPackageName}`).update({
      sunday: addPackageContentSunday.packageContentSunday
    });
    this.toastr.success('Updated','Meal')
  }
  getMealPackageList() {
    return  this.db.collection(`Providers`).doc(`${this.storage.get("userId")}`).collection(`mealPackage`).valueChanges();
 }
 ProfilePictureDataUpdate(){
  this.db.collection(`Providers`).doc(`${this.storage.get("userId")}`).update({
    avatarImage: `gs://foodapp-d7dcc.appspot.com/Providers/${this.storage.get("userId")}`
  });
 }
 getMeal(packageName){
   console.log(packageName);
   return  this.db.collection(`Providers`).doc(`${this.storage.get("userId")}`).collection(`mealPackage`).doc(packageName).valueChanges();
 }
saveInLocal(key, val): void {
    console.log('recieved= key:' + key + 'value:' + val);
    this.storage.set(key, val);
    this.data[key]= this.storage.get(key);
   }
getFromLocal(key): void {
       console.log('recieved= key:' + key);
       this.data= this.storage.get(key);
       console.log(this.data);
      }
}
