import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/interfaces/product.interface';
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


  warehouseDropdown: string[] = [
    "ALMACEN 1 - PRINCIPAL",
    "ALMACEN 2 - OFICINA",
    "ALMACEN 3 - SUBODEGA",
    "ALMACEN 4 - OTRO",
    "ALMACEN 5 - PUEBLA"
  ]

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
      this.route.navigateByUrl('/products')
    })
  }


  constructor(private accService: AccountService,  private route: Router) { }

  ngOnInit(): void {
  }

}
