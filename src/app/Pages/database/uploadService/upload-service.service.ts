import { Injectable, Inject } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore'

@Injectable()
export class UploadServiceService {

  constructor( public af: AngularFirestore,
    @Inject(FirebaseApp) private firebaseApp:any) { }

    uploadProfileImage(user, img){

      let storageRef = this.firebaseApp.storageRef();
      let af = this.af;
      let path = `/profile/${user.$key}`;
      var iRef = storageRef.child(path);
       iRef.putString(img, 'base64', {contentType: 'image/png'}).then((snapshot)=>{
         console.log('Upload a blob or file! Now Storing the reference at',`/profile/images/`);
         af.firestore.doc(`users/${user.$key}/profile/image`).update({path: path, filename: user.$key})
       });

    }
    
}
