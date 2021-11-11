import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  message: string[] = [''];
  cancelButtonText = 'Cancel';
  confirmButtonText = 'Okay';
  showConfirm = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AlertComponent>
  ) {
    if (data) {
      if (data.message) {
        if (!Array.isArray(data.message)) this.message = [data.message];
        else this.message = data.message;
      }
      this.showConfirm = data.showConfirm || this.showConfirm;
      if (data.buttonText) {
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
      if (data.buttonText) {
        this.confirmButtonText =
          data.buttonText.confirm || this.confirmButtonText;
      }
    }
    this.dialogRef.updateSize('300vw', '300vw');
  }

  // onConfirmClick(): void {
  //   this.dialogRef.close(false);
  // }

  ngOnInit() {}
}
