import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/interfaces/product.interface';
import { AccountService } from '../services/account.service';
import { TokenStorageService } from '../services/token-storage.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})


export class ProductComponent implements OnInit {

  static title: string = "Productos";
  isLoggedIn = false;

  updateQuantity = this.formBuilder.group({
    id: '',
    quantity: 0
  });

  //columnas a mostrar
  displayedColumns: string[] = ['Marca', 'Modelo', 'Categoria', 'Descripción', 'Cantidad', 'Ubicación', 'Agregar Existencias'];
  //datos a mostrar
  productsList:Product[] = [];
  productsCount:number = this.productsList.length


  updateProductQuantity(updateQuantity: FormGroup) : any {
   // this.updateQuantity.id = id;

    return this.accService.updateProductQuantity(this.updateQuantity.value).subscribe((res:any) => {
      this.getAllProducts();
    })
  }
  
  
  getAllProducts() : any{
    return this.accService.getAllProducts().subscribe((res:Product[])=>{
      this.productsList = res;
    })
  }

  onSubmit(idForm: string): void {
    // Process checkout data here
    console.log(idForm)
    console.log(JSON.stringify(this.updateQuantity.value));
  
    this.updateQuantity.patchValue({
      id:idForm
    })
    console.log(JSON.stringify(this.updateQuantity.value));
  
    this.updateProductQuantity(this.updateQuantity);
    this.updateQuantity.reset();
  }

  constructor(private formBuilder: FormBuilder, private accService: AccountService, private route: Router, private tokenStorageService : TokenStorageService) { }

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

export class ArticleProduct {
  constructor(public codigo: number, public descripcion: string, public precio: number) {
  }
}
