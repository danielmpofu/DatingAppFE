import {Injectable} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class CustomLoaderService {

  requestsCount: number = 0;

  constructor(private spinnerService: NgxSpinnerService) {
  }

  showLoadingSpinner() {
    this.requestsCount++;
    this.spinnerService.show(undefined, {
      type: 'line-scale-party',
      bdColor: 'rgba(255,255,255,0)',
      color: '#333333'
    });
  }

  hideLoadingSpinner() {
    this.requestsCount--;
    if (this.requestsCount <= 0) {
      this.requestsCount = 0;
      this.spinnerService.hide();
    }

  }

}
