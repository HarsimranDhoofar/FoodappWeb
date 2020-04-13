import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../database/auth/auth.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: any;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.getCustomerList().subscribe(customers =>{
     
      this.customers = customers ; 
      console.log(this.customers);//assign the data from subscription to your class variable
      })
      // console.log(prov[1].packageName)
      //   this.prov = prov ;
      // console.log(this.prov)
    
  }

}
