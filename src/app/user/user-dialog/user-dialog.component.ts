import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss'
})
export class UserDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.form = this.fb.group({
      vorname: [data?.vorname || '', Validators.required],
      nachname: [data?.nachname || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      telefon: [data?.telefon || '', Validators.required],
      strasse: [data?.strasse || '', Validators.required],
      plz: [data?.plz || '', Validators.required],
      ort: [data?.ort || '', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      const user: User = {
        ...this.data,
        ...this.form.value
      };
      this.dialogRef.close(user);
    }
  }
}
