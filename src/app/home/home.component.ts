import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from "@angular/router";
import { TokenStorageService } from "../services/token-storage.service";

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls:['./home.component.css']
})

export class HomeComponent {

  constructor(private tokenStorageService : TokenStorageService, private route: Router){

  }
  
  isLoggedIn = false;
  username: string;

  ngOnInit(): void {
      this.isLoggedIn = !!this.tokenStorageService.getToken();

      if(this.isLoggedIn){
          this.username = this.tokenStorageService.getName();
  
      }
      else {
          this.route.navigateByUrl('/')
      }
  }


}