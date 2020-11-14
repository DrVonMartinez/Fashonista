import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Compiler } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ProductShoppingCartComponent } from './product/product-shoppingcart/product-shoppingcart.component';
import { AdminComponent } from './admin/admin-main/admin.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { UserComponent } from './user/user-main/user.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { ProductInfopaneComponent } from './product/product-infopane/product-infopane.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductCreateComponent,
    ProductListComponent,
    ProductShoppingCartComponent,
    AdminComponent,
    AdminLoginComponent,
    UserComponent,
    UserCreateComponent,
    UserListComponent,
    ProductInfopaneComponent,
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
