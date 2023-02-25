import { Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface DetailsData {
  productId: string;
  model: string;
  quantity: number;
  returned: number;
}


@Component({
  selector: 'app-exit-details',
  templateUrl: './exit-details.component.html',
  styleUrls: ['./exit-details.component.css']
})
export class ExitDetailsComponent{

  constructor(
    public dialogRef: MatDialogRef<ExitDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DetailsData[]) 
    {}
  onNoClick(): void {
    this.dialogRef.close();
  }
 
}
