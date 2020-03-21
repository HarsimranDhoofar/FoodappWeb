import { Injectable, Inject } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Observable } from 'rxjs';
import { map, finalize } from "rxjs/operators";

@Injectable()
export class UploadServiceService {

  // public data:any=[]
  // constructor( public af: AngularFirestore,
  //   @Inject(FirebaseApp) private firebaseApp:any,
  //   private storageImg: AngularFireStorage,
  //   @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }
   
  //   ref: AngularFireStorageReference;
  //   task: AngularFireUploadTask;
  //   uploadProfileImage(img){
  //     var n = Date.now();
  //     const file = img.split(/,(.+)/)[1];
  //     console.log(img.split(/,(.+)/)[1]);
  //     const filePath = `RoomsImages/${n}`;
  //     const fileRef = this.storageImg.ref(filePath);
  //     const task = this.storageImg.upload(`RoomsImages/${n}`, file);
  //     console.log(task)
  //     task
  //       .snapshotChanges()
  //       .pipe(
  //         finalize(() => {
  //           this.downloadURL = fileRef.getDownloadURL();
  //           this.downloadURL.subscribe(url => {
  //             if (url) {
  //               this.fb = url;
  //             }
  //             console.log(this.fb);
  //           });
  //         })
  //       )
  //       .subscribe(url => {
  //         if (url) {
  //           console.log(url);
  //         }
  //       });

    // }
    // getFromLocal(key): void {
    //   console.log('recieved= key:' + key);
    //   this.data= this.storage.get(key);
    //   console.log(this.data);
    //  }
}
