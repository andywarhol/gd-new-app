import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild,  ChangeDetectorRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from "@angular/router";
import { ProductComponent } from '../product/product.component';
import { TokenStorageService } from "../services/token-storage.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  title: any = "";

  addProduct: boolean = true;
  addExit: boolean = false;
  
  isLoggedIn = false;
  username: string;


  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  @ViewChild(MatSidenav)
  productsidenav!: MatSidenav;
  
  @ViewChild(MatSidenav)
  exitssidenav!: MatSidenav;

  
  constructor(private observer: BreakpointObserver, private tokenStorageService : TokenStorageService, private route: Router, private cdr: ChangeDetectorRef){

  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res)=>
    {
        if(res.matches){
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else{
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
        this.cdr.detectChanges(); 
    });
  }

  addProductTrue(){
    this.addProduct = true;
    this.addExit = false;
  }
  
  addExitTrue(){
    this.addExit = true;
    this.addProduct= false;
  }

  
  goToProductPage(){
      this.route.navigateByUrl('/products')
  }

  ngOnInit(): void {
      this.isLoggedIn = !!this.tokenStorageService.getToken();

      if(this.isLoggedIn){
          this.username = this.tokenStorageService.getName();
  
      }
      else {
          this.route.navigateByUrl('/')
      }
  }

  logout():void{
      this.tokenStorageService.signOut();
      window.location.reload();
  }

}
