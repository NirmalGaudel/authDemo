import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../components/dialogs/alert/alert.component';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private dialog: MatDialog) {}

  alert(message = 'Test Message', cancleText = 'cancle') {
    const dialogRef = this.dialog.open(AlertComponent, {
      data: {
        message: message,
        buttonText: {
          cancel: cancleText,
        },
      },
    }).updatePosition({top:"0"});

    return dialogRef;
  }
}
