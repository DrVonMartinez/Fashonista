import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Compiler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user/user.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { ProductShoppingCartComponent } from './product/product-shoppingcart/product-shoppingcart.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCreateComponent,
    AdminComponent,
    UserComponent,
    UserListComponent,
    ProductShoppingCartComponent,
    UserCreateComponent,
    AdminLoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
