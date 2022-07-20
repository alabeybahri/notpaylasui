import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {DTONotification} from "../models/DTONotification";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess(notification:DTONotification) {
    this.toastr.success(notification.message, notification.title);
  }
  showError(notification:DTONotification) {
    this.toastr.error(notification.message, notification.title);
  }

}
