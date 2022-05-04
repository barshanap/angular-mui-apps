import { ApiService } from './../services/api.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  freshnessLists = ['Brand New', 'Second Hand', 'Refurbished'];
  productForm!: FormGroup;
  actionBtn: string = 'Save';
  productHeading: string = 'Add product';
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    });
    if (this.editData) {
      this.productForm.controls['productName'].setValue(
        this.editData.productName
      );
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.actionBtn = 'Update';
      this.productHeading = 'Edit Product';
    }
    console.log(this.editData);
  }

  addProduct() {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.api.postProducts(this.productForm.value).subscribe({
          next: (res) => {
            this._snackBar.open('product added successfully', 'close');
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert('Error While Adding the Products');
          },
        });
      }
    } else {
      this.updateProduct();
    }
  }

  updateProduct() {
    this.api.putProducts(this.productForm.value, this.editData.id).subscribe({
      next: (res) => {
        this._snackBar.open('Prdocut Updated Successfully', 'close');
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error: (err) => {
        alert('While updating the records');
      },
    });
  }

}
