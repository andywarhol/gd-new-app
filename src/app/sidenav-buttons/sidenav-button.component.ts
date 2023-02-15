import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from "@angular/router";
import { TokenStorageService } from "../services/token-storage.service";

@Component({
  selector: 'app-sidenav-button',
  templateUrl: './sidenav-button.component.html',
  styleUrls: ['./sidenav-button.component.css']
})
export class SidenavComponent implements OnInit {

  isLoggedIn = false;
  username: string;

  constructor(private observer: BreakpointObserver, private tokenStorageService : TokenStorageService, private route: Router){

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
