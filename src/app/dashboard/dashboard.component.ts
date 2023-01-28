import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TokenStorageService } from "../services/token-storage.service";

@Component({
    selector: 'dash',
    templateUrl: './dashboard.component.html',
    styleUrls:['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    //username: String = localStorage.getItem('username');

    isLoggedIn = false;
    username: string;
  
    goToProductPage(){
        this.route.navigateByUrl('/product')
    }


    constructor(private tokenStorageService : TokenStorageService, private route: Router){}
  
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