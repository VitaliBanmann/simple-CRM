import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FirebaseService } from '../services/firebase.service';
import { User } from '../models/user.model';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
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

  onUserSelected(event: MatSelectionListChange): void {
    if (event.options && event.options.length > 0) {
      this.selectedUser = event.options[event.options.length - 1].value;
    }
  }

  editUser(): void {
    if (!this.selectedUser) return;

    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '500px',
      data: { ...this.selectedUser }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.firebaseService.updateUser(result).subscribe(
          () => {
            this.selectedUser = result;
          },
          (error) => console.error('Fehler beim Aktualisieren:', error)
        );
      }
    });
  }

  deleteUser(): void {
    if (!this.selectedUser || !this.selectedUser.id) return;

    if (confirm('Möchtest du diesen User wirklich löschen?')) {
      this.firebaseService.deleteUser(this.selectedUser.id).subscribe(
        () => {
          this.selectedUser = null;
        },
        (error) => console.error('Fehler beim Löschen:', error)
      );
    }
  }

  createUser(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '500px',
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
