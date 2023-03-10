import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/interfaces/product.interface';
import { AccountService } from '../services/account.service';
import { TokenStorageService } from '../services/token-storage.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})


export class ProductComponent implements AfterViewInit{

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
  dataSourceProducts = new MatTableDataSource<Product>(this.productsList);

  updateProductQuantity(updateQuantity: FormGroup) : any {
   // this.updateQuantity.id = id;

    return this.accService.updateProductQuantity(this.updateQuantity.value).subscribe((res:any) => {
      this.getPaginatedProducts(0, 4)
    })
  }
  
  getPaginatedProducts(pages:number, productsPerPage: number){

    return this.accService.productsPaginate({pages, productsPerPage}).subscribe((res:Product[])=>{
      this.productsList = res;
      console.log(this.productsList)
    })
  }
  
  getAllProducts() : any{
    return this.accService.getAllProducts().subscribe((res:Product[])=>{
      this.productsList = res;
    })
  }

  onSubmit(idForm: string): void {
    // Process checkout data here

    this.updateQuantity.patchValue({
      id:idForm
    })
 
    this.updateProductQuantity(this.updateQuantity);
    this.updateQuantity.reset();
  }

  constructor(private formBuilder: FormBuilder, private accService: AccountService, private route: Router, private tokenStorageService : TokenStorageService) { }

  @ViewChild(MatPaginator) 
  paginator: MatPaginator;


  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if(this.isLoggedIn){
      //this.getAllProducts();
      console.log(this.productsList)
      this.getPaginatedProducts(0, 4)
    }
    else {
      this.route.navigateByUrl('/')
    }
 
  }

  ngAfterViewInit() {


  }

}

export class ArticleProduct {
  constructor(public codigo: number, public descripcion: string, public precio: number) {
  }
}
