import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
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

  title: any = "hola";

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  
  constructor(private observer: BreakpointObserver, private tokenStorageService : TokenStorageService, private route: Router){

  }

  ngAfterViewInit() {
    //if matches means we are on small screen
    this.observer.observe(['(max-width: 800px)']).subscribe((res)=>
    {
        if(res.matches){
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else{
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
    });
  }


  isLoggedIn = false;
  username: string;

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
