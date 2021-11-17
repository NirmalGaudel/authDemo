import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddCategoryComponent } from './add-category/add-category.component';
const CATEGORIES = [
  { id: 1, title: 'Campfire', description: 'Category example 1' },
  { id: 2, title: 'Trekking', description: 'Category example 2' },
  { id: 3, title: 'Marriage', description: 'Category example 3' },
  { id: 4, title: 'Party', description: 'Category example 4' },
];
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  allCategories: any[] = [];
  displayCategories: any[] = [];
  dialogRef!: MatDialogRef<any>;
  constructor(private _dialog: MatDialog) {}
  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.allCategories = CATEGORIES;
    this.displayCategories = this.allCategories;
  }

  addCategory() {
    this.dialogRef = this._dialog.open(AddCategoryComponent, {});
    this.dialogRef.disableClose = true;
  }

  filterSearch(text: string) {
    this.displayCategories = this.allCategories.filter((val) =>
      (val.title + '*' + val.description)
        .toUpperCase()
        .includes(text.toUpperCase())
    );
  }

  createCategory(data: any) {
    console.log(data);
    this.dialogRef.close();
  }
}
