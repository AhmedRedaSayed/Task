

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../Interface/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  mainApi: string = 'https://reqres.in/api/users';
  private cachedUsers: { [page: number]: User[] } = {};
  private cachedUserDetails: { [userId: number]: User } = {};



  constructor(private httpClient: HttpClient) { }

  getUsers(page: number): Observable<any> {
    // Check if data is available in cache
    if (this.cachedUsers[page]) {
      console.log('Cached data found for page', page, ':', this.cachedUsers[page]);
      return of(this.cachedUsers[page]); // Return cached data as Observable
    }

    // If data is not in cache, fetch from the API
    return this.httpClient.get<any>(`${this.mainApi}?page=${page}`).pipe(
      map(response => response), // Extract user data from response
      tap(users => {
        this.cachedUsers[page] = users; // Store fetched data in cache
        console.log('Fetched data for page', page, ':', users);
      })
    );
  }

  getUser(userId: number | null): Observable<any> {
    // Check if data is available in cache
    if (userId !== null && this.cachedUserDetails[userId]) {
      console.log('Cached user found for ID', userId, ':', this.cachedUserDetails[userId]);
      return of(this.cachedUserDetails[userId]); // Return cached data as Observable
    }

    // If data is not in cache, fetch from the API
    return this.httpClient.get<any>(`${this.mainApi}/${userId}`).pipe(
      map(response => response), // Extract user data from response
      tap(user => {
        if (userId !== null) {
          this.cachedUserDetails[userId] = user; // Store fetched data in cache
          console.log('Fetched user data for ID', userId, ':', user);
        }
      })

    );
  }
}
