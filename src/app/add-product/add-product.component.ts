import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  newProductObj : any = {
    brand: '',
    model: '',
    category: '',
    description: '',
    quantity: '',
    wharehouse: '',
    shelving: '',
    shelf: '',
    serial: ''
  }

  addProduct(){
    this.accService.addProduct(this.newProductObj).subscribe((res:any) => {
      console.log(res)
      this.route.navigateByUrl('/products')
    })
  }


  constructor(private accService: AccountService,  private route: Router) { }

  ngOnInit(): void {
  }

}
