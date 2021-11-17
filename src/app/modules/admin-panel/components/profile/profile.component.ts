import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AlertService } from 'src/app/services/alert.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  showEditButton = false;
  userId!: number;
  userDetails: any;
  isEditable = false;
  editForm: FormGroup = new FormGroup({});
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _http: HttpService,
    private _alertService: AlertService,
    private _fb: FormBuilder
  ) {
    this._route.paramMap.subscribe((data) => {
      const id = Number.parseInt(data.get('id') || '');
      // if (!id) {
      //   this._alertService.alert('Invalid user');
      //   this._router.navigate(['/users']);
      // } else this.userId = id;
      this.userId = id || Number.parseInt(localStorage.getItem('id') || '1');
    });
  }

  ngOnInit(): void {
    this.showEditButton = localStorage.getItem('role') === 'admin';
    this.editForm = this._fb.group({
      id: new FormControl(''),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
      ]),
      fullname: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('basic', [Validators.required]),
    });
    this.getUserInfo();
  }

  getUserInfo() {
    this._http
      .get('/users/' + this.userId)
      .toPromise()
      .then((data: any) => {
        this.userDetails = data;
        if (data.id === Number.parseInt(localStorage.getItem('id') || ''))
          this.showEditButton = true;
        this.resetForm();
      })
      .catch((err) => {
        this._alertService.alert(err.error.message || 'Error Fetching User');
      });
  }

  resetForm() {
    this.editForm.reset(this.userDetails);
    this.editForm.disable();
    this.isEditable = false;
  }

  toggleEdit() {
    if (this.isEditable) return this.resetForm();
    else {
      this.isEditable = true;
      this.editForm.enable();
      this.editForm.controls.id.disable();
      this.editForm.controls.role.disable();
    }
  }

  submitForm() {
    console.log(this.editForm);
    const data = this.editForm.value;

    this._http
      .put('/users/' + this.userId, data)
      .toPromise()
      .then((data) => {
        console.log(this.userDetails, data);
        this.userDetails = { ...this.userDetails, ...data };
        this.resetForm();
        this._alertService.alert('Update Successful', 'okay');
      })
      .catch((err) => {
        if (err.status === 400 && err.error?.errors) {
          let errorText: string[] = [];
          Object.values(err.error.errors).forEach((e: any) => {
            errorText.push(e.msg);
          });
          this._alertService.alert(
            errorText.length ? errorText : 'Error Updating User',
            'Okay'
          );
        } else
          this._alertService.alert(
            err.error.message || 'Error Updating User',
            'Okay'
          );
      });
  }
}
