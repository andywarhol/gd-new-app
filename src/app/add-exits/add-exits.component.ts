import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exit, ExitProduct } from 'src/interfaces/exits.interface';
import { ExitKey } from 'src/interfaces/key.interface';
import { Product } from 'src/interfaces/product.interface';
import { QueryProducts } from 'src/interfaces/query-products.interface';
import { AccountService } from '../services/account.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component'; 


@Component({
  selector: 'app-add-exits',
  templateUrl: './add-exits.component.html',
  styleUrls: ['./add-exits.component.css']
})
export class AddExitsComponent implements OnInit {
  isProductSelected = false
  
  query: QueryProducts ={
    field: '',
    search: ''
  };

  selectedProduct: Product ={
    brand: '',
    model: '',
    category: '',
    description: '',
    quantity: 0,
    warehouse: '',
    shelving: '',
    shelf: ''
  };



  foundProducts: Product[];  
  
  newExitProduct: ExitProduct ={
    productId: '',
    model: '',
    quantity: 0,
    returned: 0
  }

  newExit : Exit = {
    key: '',
    employee: '',
    project: '',
    client: '',
    receives: '',
    products: []
  }

  selectedProductsData: ExitProduct[] =[] 
  showTable: boolean = false;
  searchProducts() {
    this.accService.searchProducts(this.query).subscribe((res: Product[]) => {
      this.foundProducts = res;
      if(res.length != 0){
        this.labelselect = "--- PRODUCTOS ENCONTRADOS ---"
      }
    })
  }

  getProducts(){
    return this.selectedProductsData;
  }

  addExitProduct(){
    //add them to local storage
    if(this.newExitProduct.quantity != 0 && this.newExitProduct.productId != ''){
        
      localStorage.setItem("1", JSON.stringify(this.newExitProduct))

      this.newExit.products.push(this.newExitProduct);
      this.selectedProductsData.push(this.newExitProduct);
      console.log(this.selectedProductsData)
      
      this.route.navigateByUrl('/home')
      
      
      if(this.selectedProductsData.length > 0){
        this.showTable = true;
      }

      this.newExitProduct = {
        productId: '',
        model: '',
        quantity: 0,
        returned: 0
      }

      this.selectedProduct = {
        brand: '',
        model: '',
        category: '',
        description: '',
        warehouse: '',
        shelving: '',
        shelf: ''
      }

      this.foundProducts = []

      this.query = {
        field: '',
        search: ''
      }
      this.isProductSelected = false;
      this.labelselect = "--- No hay producto seleccionado ---";
    }
    else {
      this.dialog.open(ErrorDialogComponent);
    }
  }
  
  addExit(){
    console.log(this.newExit)
    this.accService.addExit(this.newExit).subscribe((res:any) => {
      if(this.route.url == '/salidas'){
        window.location.reload();
      } else {
        this.route.navigateByUrl('/salidas')
      }
    })
  }

  getKey(){
    this.accService.getExitKey().subscribe((res:ExitKey) => {
      this.newExit.key = res.key;
    })
  
    
  }

  selectProduct(product: Product){
    this.selectedProduct = product;
    this.isProductSelected = true;
    this.newExitProduct.model = product.model;
    this.newExitProduct.productId = product._id;
    this.newExitProduct.returned = 0;
  }


  constructor(private accService: AccountService,  private route: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getKey();
    
  }

  //LABELS
  labelselect: string = "false";
  displayedColumns: string[] = ['Modelo', 'Almacen', 'Estante', 'Repisa'];

}
