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
      return this.db.doc(`Users/${userCredential.user.uid}`).set({
        email:this.newUser.email,
        firstName: this.newUser.firstName,
        lastname: this.newUser.lastName,
        role: 'network user'
      })
    }
    logout(){
      return this.afAuth.auth.signOut();
    }
    
}