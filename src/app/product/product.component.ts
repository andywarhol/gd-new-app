import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  isLoggedIn = false;



  getAllProducts() : any{
    return this.accService.getAllProducts().subscribe((res:any)=>{
    })
  }

  constructor(private accService: AccountService, private route: Router, private tokenStorageService : TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if(this.isLoggedIn){
      this.getAllProducts();
 
    }
    else {
      this.route.navigateByUrl('/')
    }
 
  }

}
