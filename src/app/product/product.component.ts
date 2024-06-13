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
import { MatSort } from '@angular/material/sort';

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

  //dataSourceProducts = new MatTableDataSource<Product>(this.productsList);
  dataSource: MatTableDataSource<Product>; 


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  updateProductQuantity(updateQuantity: FormGroup) : any {
   // this.updateQuantity.id = id;

    return this.accService.updateProductQuantity(this.updateQuantity.value).subscribe((res:any) => {
      this.getPaginatedProducts(0, 4)
    })
  }
  
  getPaginatedProducts(pages:number, productsPerPage: number){

    return this.accService.productsPaginate({pages, productsPerPage}).subscribe((res:Product[])=>{
      this.productsList = res;
    })
  }
  
  getAllProducts() : any{
    return this.accService.getAllProducts().subscribe((res:Product[])=>{
      this.productsList = res;
      this.dataSource.data = this.productsList; // Asigna los datos al dataSource
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(filterValue: string): void {
    const filterValueLower = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValueLower;
  }

  onSubmit(idForm: string): void {
    // Process checkout data here

    this.updateQuantity.patchValue({
      id:idForm
    })
 
    this.updateProductQuantity(this.updateQuantity);
    this.updateQuantity.reset();
  }

  constructor(private formBuilder: FormBuilder, private accService: AccountService, private route: Router, private tokenStorageService : TokenStorageService) { 
    this.dataSource = new MatTableDataSource();
  }

  //@ViewChild(MatPaginator) 
  //paginator: MatPaginator;


  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if(this.isLoggedIn){
      //this.getPaginatedProducts(0, 4)
      this.getAllProducts();
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
