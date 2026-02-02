import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { User, UserNote } from '../../models/user.model';

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatTabsModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss'
})
export class UserDialogComponent {
  form: FormGroup;
  isLoading = false;
  viewMode: boolean = false;
  newNoteText: string = '';
  notes: UserNote[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User & { viewMode?: boolean }
  ) {
    this.viewMode = data?.viewMode || false;
    this.notes = data?.notes || [];
    
    this.form = this.fb.group({
      vorname: [{ value: data?.vorname || '', disabled: this.viewMode }, Validators.required],
      nachname: [{ value: data?.nachname || '', disabled: this.viewMode }, Validators.required],
      geburtsdatum: [{ value: data?.geburtsdatum ? new Date(data.geburtsdatum) : null, disabled: this.viewMode }],
      email: [{ value: data?.email || '', disabled: this.viewMode }, [Validators.required, Validators.email]],
      telefon: [{ value: data?.telefon || '', disabled: this.viewMode }, Validators.required],
      strasse: [{ value: data?.strasse || '', disabled: this.viewMode }, Validators.required],
      plz: [{ value: data?.plz || '', disabled: this.viewMode }, Validators.required],
      ort: [{ value: data?.ort || '', disabled: this.viewMode }, Validators.required]
    });
  }

  addNote(): void {
    if (this.newNoteText.trim()) {
      const newNote: UserNote = {
        id: Date.now().toString(),
        text: this.newNoteText,
        createdAt: Date.now(),
        createdBy: 'Aktueller Benutzer'
      };
      this.notes.unshift(newNote);
      this.newNoteText = '';
    }
  }

  deleteNote(id: string | undefined): void {
    if (id) {
      this.notes = this.notes.filter(note => note.id !== id);
    }
  }

  formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      this.isLoading = true;
      const formValue = this.form.value;
      const user: User = {
        ...this.data,
        ...formValue,
        geburtsdatum: formValue.geburtsdatum ? new Date(formValue.geburtsdatum).getTime() : undefined,
        notes: this.notes
      };
      this.dialogRef.close(user);
    }
  }
}
