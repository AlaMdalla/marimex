import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { MarblePageComponent } from './components/pages/marble-page/marble-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { MarbelsAddComponent } from './components/pages/marbels-add/marbels-add.component';
import { AdminPageComponent } from './components/pages/admin-page/admin-page.component';
import { UpdatePageComponent } from './components/pages/update-page/update-page.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'search/:searchTerm',component:HomeComponent},
  {path:'marble/:id',component:MarblePageComponent},
  {path:'tag/:tag',component:HomeComponent} ,
  {path:'cart-page',component:  CartPageComponent} ,
  {path:'login',component:  LoginPageComponent} ,
  {path:'register',component:  RegisterPageComponent} ,
  {path:'admin',component:AdminPageComponent},
  {path:'create',component:  MarbelsAddComponent} ,
  {path:'update/:marbleId',component:  UpdatePageComponent} 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
