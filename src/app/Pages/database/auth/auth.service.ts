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
      Monday:"",
      Tuesday:"",
      Wednesday:"",
      Thursday:"",
      Friday:"",
      Saturaday:"",
      Sunday:""
    });

  }
  addPackageContent(addContent: any, currentPackageName){
    this.db.collection(`Providers`).doc(`${this.storage.get("userId")}`).collection(`mealPackage`).doc(`${currentPackageName}`).update({
      Monday:"harsimran",
    });
    this.toastr.success('Updated','Meal')
  }
  getMealPackageList() {
    return  this.db.collection(`Providers`).doc(`${this.storage.get("userId")}`).collection(`mealPackage`).valueChanges();
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
