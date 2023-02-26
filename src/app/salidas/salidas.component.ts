import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Product } from 'src/interfaces/product.interface';
import { Exit } from 'src/interfaces/exits.interface';
import { MatDialog } from '@angular/material/dialog';
import { ExitDetailsComponent } from '../exit-details/exit-details.component';


export interface DetailsData {
  productId: string;
  model: string;
  quantity: number;
  returned: number;
}


@Component({
  selector: 'app-salidas',
  templateUrl: './salidas.component.html',
  styleUrls: ['./salidas.component.css']
})

export class SalidasComponent implements OnInit {
  isLoggedIn = false;
  exitsList: Exit[] = [];

  displayedColumns: string[] = ['Llave', 'Empleado', 'Proyecto', 'Cliente', 'Recibe', 'Productos'];
  
  getAllExits() : any{
    return this.accService.getAllExits().subscribe((res:Exit[])=>{
      this.exitsList = res;
    })
  }

  constructor(public dialog: MatDialog, private accService: AccountService,private route: Router, 
    private tokenStorageService : TokenStorageService) { }


  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if(this.isLoggedIn){
      this.getAllExits();
    }
    else {
      this.route.navigateByUrl('/')
    }
 
  }

  openDetails(products: DetailsData[], exitId: string): void {
    const dialogRef = this.dialog.open(ExitDetailsComponent, {
      data: {products, exitId}
    });
  }

}

