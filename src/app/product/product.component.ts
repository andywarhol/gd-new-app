import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/interfaces/product.interface';
import { AccountService } from '../services/account.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {

  static title: string = "Productos";

  updateQuantity: any = {
    id: '',
    quantity: 0
  }

  isLoggedIn = false;
  productList:Product[] = [];
  displayedColumns: string[] = ['Marca', 'Modelo', 'Categoria', 'Descripción', "Cantidad", "Ubicación", "Agregar Existencias"];

  updateProductQuantity(id : string ) : any {
    console.log(id);
    console.log(this.updateQuantity)
    const quantity = document.getElementById(id);
    console.log(quantity)
    return this.accService.updateProductQuantity(this.updateQuantity).subscribe((res:any) => {
      

      this.getAllProducts();
    })
  }
  
  
  getAllProducts() : any{
    return this.accService.getAllProducts().subscribe((res:Product[])=>{
      this.productList = res;
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
