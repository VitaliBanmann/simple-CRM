import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private firebaseUrl = 'https://simple-crm-18c1b-default-rtdb.europe-west1.firebasedatabase.app/users';
  private usersSubject = new BehaviorSubject<User[]>([]);
  public users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  loadUsers(): void {
    this.http.get<{ [key: string]: User }>(`${this.firebaseUrl}.json`).subscribe(
      (data) => {
        if (data) {
          const users = Object.keys(data).map((key) => ({
            ...data[key],
            id: key
          }));
          this.usersSubject.next(users);
        }
      },
      (error) => console.error('Fehler beim Laden der Users:', error)
    );
  }

  addUser(user: User): Observable<any> {
    return new Observable((observer) => {
      this.http.post(`${this.firebaseUrl}.json`, user).subscribe(
        (response: any) => {
          user.id = response.name;
          const currentUsers = this.usersSubject.value;
          this.usersSubject.next([...currentUsers, user]);
          observer.next(response);
          observer.complete();
        },
        (error) => {
          console.error('Fehler beim Hinzufügen des Users:', error);
          observer.error(error);
        }
      );
    });
  }

  updateUser(user: User): Observable<any> {
    if (!user.id) {
      return new Observable((observer) => observer.error('User ID fehlt'));
    }
    return new Observable((observer) => {
      this.http.put(`${this.firebaseUrl}/${user.id}.json`, user).subscribe(
        (response) => {
          const currentUsers = this.usersSubject.value;
          const index = currentUsers.findIndex((u) => u.id === user.id);
          if (index !== -1) {
            currentUsers[index] = user;
            this.usersSubject.next([...currentUsers]);
          }
          observer.next(response);
          observer.complete();
        },
        (error) => {
          console.error('Fehler beim Aktualisieren des Users:', error);
          observer.error(error);
        }
      );
    });
  }

  deleteUser(userId: string): Observable<any> {
    return new Observable((observer) => {
      this.http.delete(`${this.firebaseUrl}/${userId}.json`).subscribe(
        (response) => {
          const currentUsers = this.usersSubject.value.filter(
            (u) => u.id !== userId
          );
          this.usersSubject.next(currentUsers);
          observer.next(response);
          observer.complete();
        },
        (error) => {
          console.error('Fehler beim Löschen des Users:', error);
          observer.error(error);
        }
      );
    });
  }
}
