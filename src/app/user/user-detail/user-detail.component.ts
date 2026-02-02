import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { FirebaseService } from '../../services/firebase.service';
import { User, UserNote } from '../../models/user.model';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatTabsModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
  form: FormGroup;
  isLoading = false;
  viewMode: boolean = true;
  newNoteText: string = '';
  notes: UserNote[] = [];
  user: User | null = null;
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private firebaseService: FirebaseService
  ) {
    this.form = this.fb.group({
      vorname: [{ value: '', disabled: true }, Validators.required],
      nachname: [{ value: '', disabled: true }, Validators.required],
      geburtsdatum: [{ value: null, disabled: true }],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      telefon: [{ value: '', disabled: true }, Validators.required],
      strasse: [{ value: '', disabled: true }, Validators.required],
      plz: [{ value: '', disabled: true }, Validators.required],
      ort: [{ value: '', disabled: true }, Validators.required]
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.loadUser(this.userId);
    }
  }

  loadUser(id: string): void {
    this.isLoading = true;
    this.firebaseService.users$.subscribe(users => {
      this.user = users.find(u => u.id === id) || null;
      if (this.user) {
        this.notes = this.user.notes || [];
        this.form.patchValue({
          vorname: this.user.vorname,
          nachname: this.user.nachname,
          geburtsdatum: this.user.geburtsdatum ? new Date(this.user.geburtsdatum) : null,
          email: this.user.email,
          telefon: this.user.telefon,
          strasse: this.user.strasse,
          plz: this.user.plz,
          ort: this.user.ort
        });
      }
      this.isLoading = false;
    });
  }

  enableEdit(): void {
    this.viewMode = false;
    this.form.enable();
  }

  cancelEdit(): void {
    this.viewMode = true;
    this.form.disable();
    if (this.user) {
      this.form.patchValue({
        vorname: this.user.vorname,
        nachname: this.user.nachname,
        geburtsdatum: this.user.geburtsdatum ? new Date(this.user.geburtsdatum) : null,
        email: this.user.email,
        telefon: this.user.telefon,
        strasse: this.user.strasse,
        plz: this.user.plz,
        ort: this.user.ort
      });
    }
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
      this.saveUser();
    }
  }

  deleteNote(id: string | undefined): void {
    if (id) {
      this.notes = this.notes.filter(note => note.id !== id);
      this.saveUser();
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

  saveUser(): void {
    if (this.form.valid && this.user) {
      this.isLoading = true;
      const formValue = this.form.getRawValue();
      const updatedUser: User = {
        ...this.user,
        ...formValue,
        geburtsdatum: formValue.geburtsdatum ? new Date(formValue.geburtsdatum).getTime() : undefined,
        notes: this.notes
      };
      
      this.firebaseService.updateUser(updatedUser).subscribe(
        () => {
          console.log('User aktualisiert');
          this.user = updatedUser;
          this.viewMode = true;
          this.form.disable();
          this.isLoading = false;
        },
        (error) => {
          console.error('Fehler beim Aktualisieren:', error);
          this.isLoading = false;
        }
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/user']);
  }
}
