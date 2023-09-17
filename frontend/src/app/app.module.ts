import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule,HttpInterceptor } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { StarRatingComponent } from './components/partials/star-rating/star-rating.component';
import { SearchComponent } from './components/partials/search/search.component';
import { MarblePageComponent } from './components/pages/marble-page/marble-page.component';
import { TagsComponent } from './components/partials/tags/tags.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { TitleComponent } from './components/partials/title/title.component';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { InputContainerComponent } from './components/partials/input-container/input-container.component';
import { InputValidationComponent } from './components/partials/input-validation/input-validation.component';
import { TextInputComponent } from './components/partials/text-input/text-input.component';
import { DefaultButtonComponent } from './components/partials/default-button/default-button.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { LoadingComponent } from './components/partials/loading/loading.component';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { MapComponent } from './components/partials/map/map.component';
import { BodyElementsComponent } from './components/partials/body-elements/body-elements.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ContactUsComponent } from './components/partials/contact-us/contact-us.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { MarbelsAddComponent } from './components/pages/marbels-add/marbels-add.component';
import { AdminPageComponent } from './components/pages/admin-page/admin-page.component';
import { UpdatePageComponent } from './components/pages/update-page/update-page.component'; // <-- import the module

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    StarRatingComponent,
    SearchComponent,
    MarblePageComponent,
    TagsComponent,
    CartPageComponent,
    TitleComponent,
    NotFoundComponent,
  
    LoginPageComponent,
        InputContainerComponent,
        InputValidationComponent,
        TextInputComponent,
        DefaultButtonComponent,
        RegisterPageComponent,
        LoadingComponent,
        MapComponent,
        BodyElementsComponent,
        ContactUsComponent,
        FooterComponent,
        MarbelsAddComponent,
        AdminPageComponent,
        UpdatePageComponent,
        
        
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut:3000,
      positionClass:'toast-bottom-right',
      newestOnTop:false,
      
    })
    
  ],
  providers: [
  {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
