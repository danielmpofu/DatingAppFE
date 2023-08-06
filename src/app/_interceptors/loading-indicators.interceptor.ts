import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {delay, finalize, Observable} from 'rxjs';
import {CustomLoaderService} from "../services/custom-loader.service";

@Injectable()
export class LoadingIndicatorsInterceptor implements HttpInterceptor {

  constructor(private customLoaderService:CustomLoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.customLoaderService.showLoadingSpinner();
    return next.handle(request).pipe(delay(1000), finalize(()=>{
      this.customLoaderService.hideLoadingSpinner();
    }))
  }
}
