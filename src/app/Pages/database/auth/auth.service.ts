import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
  newUser: any;
  constructor(
    private afAuth: AngularFireAuth,
    private db:AngularFirestore,
    private router: Router) { }

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
           this.router.navigate(['/dashboard'])
         }
       })
    }
    createUser(user){
      this.afAuth.auth.createUserWithEmailAndPassword( user.email, user.password)
      .then( userCredential => {
         this.newUser = user

         userCredential.user.updateProfile({
          displayName: user.firstName + ' ' + user.lastName
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
        email:this.newUser.email,
        firstName: this.newUser.firstName,
        lastname: this.newUser.lastName,
        address: this.newUser.address
      })
    }
    logout(){
      return this.afAuth.auth.signOut();
    }
    
}
