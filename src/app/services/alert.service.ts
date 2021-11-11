import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../shared/alert/alert.component';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private dialog: MatDialog) {}

  alert(message:string|string[] = '', cancelText = 'Cancel') {
    const dialogRef = this.dialog.open(AlertComponent, {
      data: {
        message: message,
        buttonText: {
          cancel: cancelText,
        },
      },
    });
    // .updatePosition({ top: '0' });
    return dialogRef;
  }

  confirm(message = '', confirmText = 'Confirm', cancelText = 'Cancel') {
    return this.dialog.open(AlertComponent, {
      data: {
        message: message,
        showConfirm: true,
        buttonText: {
          confirm: confirmText,
          cancel: cancelText,
        },
      },
    });
  }
}
