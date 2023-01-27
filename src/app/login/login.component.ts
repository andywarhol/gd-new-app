import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AccountService } from "../services/account.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls:['./login.component.css']
})

export class LoginComponent implements OnInit {
    //Login logic.
    loginObj: any = {
        username: '',
        password:''
    }
    onLogin(){

        //Call api function for login.

        this.accService.onLogin(this.loginObj).subscribe((res:any) => {
            console.log('res', res);
            localStorage.setItem('accessToken', res.accessToken);
            this.route.navigateByUrl('/home')
        })

    }
    
    constructor(private accService: AccountService, private route: Router){}

    ngOnInit(): void{
    }

}