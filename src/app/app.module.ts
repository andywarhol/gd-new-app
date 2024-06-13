import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SalidasComponent } from './salidas/salidas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { CustomInterceptor } from './services/custom.interceptor';
import { ProductComponent } from './product/product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { SidenavComponent } from './sidenav-buttons/sidenav-button.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NavigationComponent } from './navigation/navigation.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ExitDetailsComponent } from './exit-details/exit-details.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AddExitsComponent } from './add-exits/add-exits.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';


const routes : Routes = [
  { path: '', component: LoginComponent},
  { path: '', 
  component: NavigationComponent,
  children: [
    { path: 'home', component: HomeComponent },
    { path: 'products', component: ProductComponent },
    { path: 'salidas', component: SalidasComponent }

  ]},
]


@NgModule({
  declarations: [
    AppComponent, 
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    ProductComponent,
    AddProductComponent,
    HeaderComponent,
    SidenavComponent,
    ToolbarComponent,
    NavigationComponent,
    SalidasComponent,
    ExitDetailsComponent,
    AddExitsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule, 
    MatCardModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatSelectModule,
    MatTooltipModule,
    MatSortModule,

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
