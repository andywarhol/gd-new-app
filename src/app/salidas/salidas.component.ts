import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Exit, Product } from '../../interfaces';
import { MatDialog } from '@angular/material/dialog';
import { ExitDetailsComponent } from '../exit-details/exit-details.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserRoles } from '../../interfaces/enums/roles.enum';


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

  dataSource: MatTableDataSource<Exit>; 
  displayedColumns: string[] = ['Llave', 'Empleado Solicita', 'Proyecto', 'Cliente', 'Quien Recibe','Fecha', 'Creado por' ,'Productos', 'Status'];
  isAdmin: boolean = false;
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  


  /* CODIGO NO FILTER
  getAllExits() : any{
    return this.accService.getAllExits().subscribe((res:Exit[])=>{
      this.exitsList = res;
    })
  }
  */
  /* CODIGO FILTRA POR KEY
    getAllExits(): void {
      this.accService.getAllExits().subscribe((res: Exit[]) => {
        this.exitsList = res;
        this.dataSource = new MatTableDataSource(this.exitsList); // Update the dataSource with the fetched data
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (data: Exit, filtersJson: string) => {
          const matchFilter = [];
          const filters = JSON.parse(filtersJson);
          
          filters.forEach(filter => {
            const val = data[filter.id] === null ? '' : data[filter.id];
            matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
          });
          
          return matchFilter.every(Boolean);
        };
      });
    }

    applyFilter(filterValue: string) {

      const tableFilters = [];
      tableFilters.push({
        id: 'key',
        value: filterValue
      });


      this.dataSource.filter = JSON.stringify(tableFilters);
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  */

  getAllExits(): void {
    this.accService.getAllExits().subscribe((res: Exit[]) => {
      this.exitsList = res;
      this.dataSource.data = this.exitsList; // Asigna los datos al dataSource
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string): void {
    const filterValueLower = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValueLower;
  }

  constructor(public dialog: MatDialog, private accService: AccountService,private route: Router, 
    private tokenStorageService : TokenStorageService) {
      this.dataSource = new MatTableDataSource();
    }

  
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if(this.isLoggedIn){
      this.getAllExits();
    }
    else {
      this.route.navigateByUrl('/')
    }

    if (localStorage.getItem('roles') == UserRoles.ADMIN) {
      this.isAdmin = true;
    }
 
  }


  openDetails(products: DetailsData[], exitId: string): void {
    const dialogRef = this.dialog.open(ExitDetailsComponent, {
      data: {products, exitId}
    });
  }


}

