import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
var pendingRequest=0;
@Injectable()

export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadinService:LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  this.loadinService.showLoading();
  pendingRequest=pendingRequest+1;
    return next.handle(request).pipe(
      tap({
        next:(event)=>{
          if(event.type===HttpEventType.Response){ // the request is finshied
            this.handelHideLoading();
          }           
        },error:(_)=>{
          this.handelHideLoading();
        }
      })
    );
  }
  handelHideLoading(){
    pendingRequest=pendingRequest-1;
    if(pendingRequest===0){
      this.loadinService.hideLoading();
    }
  }
}
