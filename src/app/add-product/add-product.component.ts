import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/interfaces/product.interface';
import { warehouse } from 'src/interfaces/warehouse.interface';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  newProductObj : Product = {
    brand: '',
    model: '',
    category: '',
    description: '',
    quantity: 0,
    warehouse: '',
    shelving: '',
    shelf: '',
    serial: ''
  }


  warehouseDropdown: warehouse[] = []

  categoryDropdown: string[] = [
    "CABLEADO ESTRUCTURADO",
    "CCTV",
    "AUDIO",
    "VIDEO",
    "ENERGIA",
    "CANALIZACION",
    "INCENDIO",
    "ALARMA",
    "FIBRA OPTICA",
    "EQUIPO ACTIVO RED",
    "ELECTRICO"
  ]


  addProduct(){
    this.accService.addProduct(this.newProductObj).subscribe((res:any) => {
      if(this.route.url == '/products'){
        window.location.reload();
      } else {
        this.route.navigateByUrl('/products')
      }
    })
  }

  getWarehouses(){
    this.accService.getWarehouses().subscribe((res:warehouse[]) =>{
      this.warehouseDropdown = res;
    })
  }


  constructor(private accService: AccountService,  private route: Router) { }

  ngOnInit(): void {
    //this.getWarehouses();
  }

}
