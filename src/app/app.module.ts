import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, NgModel} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { CustomInterceptor } from './services/custom.interceptor';
import { ProductComponent } from './product/product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { HeaderComponent } from './header/header.component';


const routes : Routes = [
  { path: '', component: LoginComponent},
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductComponent }
]


@NgModule({
  declarations: [
    AppComponent, 
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    ProductComponent,
    AddProductComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
