import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../database/auth/auth.service';
import { ProviderInfo } from '../../database/auth/provider-info.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  list: ProviderInfo[]
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.getEmployees().subscribe(actionArray =>{
      this.list = actionArray.map(item => 
        {
          const data = item.payload.doc.data();
        return {
          id: item.payload.doc.id,
          ...data
        } as ProviderInfo;
      })
      });
  }

}
