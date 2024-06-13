import { Component, OnInit,Output, EventEmitter  } from '@angular/core';
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
  isProductsFound = false 


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
        this.isProductsFound = true
        this.labelselect = "--- PRODUCTOS ENCONTRADOS ---"
      }
    })
  }

  getProducts(){
    return this.selectedProductsData;
  }
  cantidadValida: boolean = false; // Flag para habilitar o deshabilitar el botón

  checkCantidad() {
    // Validar si la cantidad es mayor que 0
    this.cantidadValida = this.newExitProduct.quantity > 0 && this.newExitProduct.quantity <= this.selectedProduct.quantity;
  }


  addExitProduct(){

    
    //add them to local storage
    if(this.newExitProduct.quantity != 0){
        
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
  //catching response to bind it in html
  responseStatus: number | null = null; 

  
  addExit(){
    this.accService.addExit(this.newExit).subscribe((res:any) => {
  
      
       // this.responseStatus = res.status;
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
