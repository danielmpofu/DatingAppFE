import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent, HttpErrorResponse,
  //HttpInterceptor
} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import {NavigationExtras, Router} from "@angular/router";
import {ToastrModule, ToastrService} from "ngx-toastr";

@Injectable()
export class HttpInterceptor implements HttpInterceptor {

  constructor(private router:Router, private toastr:ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
        catchError((error:HttpErrorResponse) => {
          if(error){
            switch (error.status) {

              case 400:
                if(error.error.errors){
                  const modelStateErrors:any[] = [];
                  for (const key in error.error.errors){
                    if(error.error.errors[key]){
                      modelStateErrors.push(error.error.errors[key])
                    }
                  }
                  throw  modelStateErrors.flat();
                }else{
                  this.toastr.error(error.error, error.status.toString())
                }
                break;

              case 401:
                this.toastr.error("Unauthorized");
                break;

              case 404:
                this.router.navigateByUrl("/not-found");
                break;

              case 500:
                this.toastr.error("internal server error");
                const navigationExtras:NavigationExtras = {state:{error:error.error}}
                this.router.navigateByUrl("/server-error", navigationExtras);
                break;

              default:
                this.router.navigateByUrl("/server-error");
                this.toastr.error("Something unexpected went wrong");
                console.log(error);
                break;
            }
          }
            throw  error;

        })
    );
  }
}
