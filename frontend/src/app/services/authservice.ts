import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Customer } from '../interfaces/customer';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

private readonly API_URL = 'https://example.com/auth';
private user$ = new BehaviorSubject<Customer | null>(null);

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<Customer> {
    const body = { email, password };
    return this.http.post<Customer>(`${this.API_URL}/login`, body).pipe(
      tap(customer => {
        this.user$.next(customer);
        localStorage.setItem('customer', JSON.stringify(customer));
      })
    );
  }
  logout(): void {
    this.user$.next(null);
    localStorage.removeItem('customer');
  }

  getCustomer(): Customer | null {
    return this.user$.getValue();
  }

  isLoggedIn(): boolean {
    return !!this.getCustomer();
  }

  isAuthenticated(): boolean {
    // Check if the user is authenticated
    return localStorage.getItem('token') !== null;
  }
  
  getUser$(): Observable<Customer | null> {
    return this.user$.asObservable();
  }
  
}
