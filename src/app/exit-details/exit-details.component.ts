import { Component, Inject} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AccountService } from '../services/account.service';


export interface ProductDetails {
  productId: string;
  model: string;
  quantity: number;
  returned: number;
}


export interface DetailsData {
  exitId:string,
  products: ProductDetails[]
}

export interface Returned {
  id: string,
  productId: string,
  returned: number
}


@Component({
  selector: 'app-exit-details',
  templateUrl: './exit-details.component.html',
  styleUrls: ['./exit-details.component.css']
})
export class ExitDetailsComponent{

  returned = this.formBuilder.group({
    id: '',
    productId: '',
    returned: 0
  });

  onSubmit(productId: string, exitId: string){
    this.returned.value.id = exitId;
    this.returned.value.productId = productId;
    this.updateExitReturned(this.returned);
  }

  
  updateExitReturned(updateQuantity: FormGroup) : any {
    // this.updateQuantity.id = id;
     return this.accService.updateExitReturned(updateQuantity.value).subscribe((res:any) => {
      window.location.reload();
     })
  }
  

  constructor(private formBuilder: FormBuilder, private accService: AccountService,
    public dialogRef: MatDialogRef<ExitDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DetailsData) 
    {}
  onNoClick(): void {
    this.dialogRef.close();
  }

 
}
