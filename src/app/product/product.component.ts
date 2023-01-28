import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  getAllProducts(){
    this.accService.getAllProducts().subscribe((res:any)=>{
    })
  }

  constructor(private accService: AccountService, private route: Router) { }

  ngOnInit(): void {
  
  }

}
