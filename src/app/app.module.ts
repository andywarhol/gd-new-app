import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { FormsModule, NgModel} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';


const routes : Routes = [
  { path: ' ', component: LoginComponent},
  { path: 'dash', component: DashboardComponent }
]


@NgModule({
  declarations: [
    AppComponent, 
    LoginComponent,
    DashboardComponent,
    HomeComponent,

  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule, 
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
