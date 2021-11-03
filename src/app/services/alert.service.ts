import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../shared/alert/alert.component';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private dialog: MatDialog) {}

  alert(message = '', cancleText = 'Cancle') {
    const dialogRef = this.dialog
      .open(AlertComponent, {
        data: {
          message: message,
          buttonText: {
            cancel: cancleText,
          },
        },
      })
      .updatePosition({ top: '0' });
    return dialogRef;
  }

  confirm(message = '', confirmText = 'Confirm', cancleText = 'Cancle') {
    return this.dialog.open(AlertComponent, {
      data: {
        message: message,
        showConfirm: true,
        buttonText: {
          confirm: confirmText,
          cancel: cancleText,
        },
      },
    });
  }
}
