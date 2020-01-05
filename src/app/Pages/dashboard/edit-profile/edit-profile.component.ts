import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../database/auth/auth.service';
import { ProviderInfo } from '../../database/auth/provider-info.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  
  prov: ProviderInfo[]
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.getEmployees().subscribe(prov =>{
      console.log(prov)
      this.prov = prov ;
      
    })
  }

}
