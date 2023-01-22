import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";

const routes : Routes = [
    {
        path: '',
        component:LoginComponent
    },
    {
        path:'',
        component: HomeComponent,
        children:[
            {
                path:'/dash',
                component: DashboardComponent
            }
        ]
    }


]