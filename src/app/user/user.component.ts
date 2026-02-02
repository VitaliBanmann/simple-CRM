import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FirebaseService } from '../services/firebase.service';
import { User } from '../models/user.model';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    UserDialogComponent
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  users$ = this.firebaseService.users$;
  selectedUser: User | null = null;

  constructor(
    private firebaseService: FirebaseService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.firebaseService.loadUsers();
  }

  editUserById(user: User): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '700px',
      data: { ...user, viewMode: false }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.firebaseService.updateUser(result).subscribe(
          () => {
            console.log('User aktualisiert');
          },
          (error) => console.error('Fehler beim Aktualisieren:', error)
        );
      }
    });
  }

  viewUserById(user: User): void {
    this.dialog.open(UserDialogComponent, {
      width: '700px',
      data: { ...user, viewMode: true },
      panelClass: 'user-view-dialog'
    });
  }

  deleteUserById(user: User): void {
    if (!user || !user.id) return;

    if (confirm(`Möchtest du ${user.vorname} ${user.nachname} wirklich löschen?`)) {
      this.firebaseService.deleteUser(user.id).subscribe(
        () => {
          console.log('User gelöscht');
        },
        (error) => console.error('Fehler beim Löschen:', error)
      );
    }
  }

  createUser(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '700px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.firebaseService.addUser(result).subscribe(
          () => {
            console.log('User erstellt');
          },
          (error) => console.error('Fehler beim Erstellen des Users:', error)
        );
      }
    });
  }
}
