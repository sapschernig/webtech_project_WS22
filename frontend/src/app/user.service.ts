import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Customer } from './interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl= 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  registerUser(email:string, password: string, firstName: string, lastName: string, phone: string, address: string, zipCode: string, city: string, country: string) {
    const url = 'http://localhost:3000/api/register';
    const data = { email, password, first_name: firstName, last_name: lastName, phone, address, zipcode: zipCode, city, country};
    return this.http.post(url, data);
  }
  checkEmailExists(email: string): Observable<{ exists: boolean; password: string; }> {
    const url = `${this.apiUrl}/checkUserExists/${email}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        console.log(response);
        return { exists: response.exists, password: response.password } as { exists: boolean; password: string; };
      }),
      catchError((error: any) => {
        console.error('Error checking if email exists:', error);
        return of({ exists: false, password: '' });
      })
    );
  }
  checkUserExists(email: string, password: string): Observable<boolean> {
    const url = `${this.apiUrl}/checkUserExists/${email}`;
    const data = { password };
    
    return this.http.post(url, data).pipe(
      map((response: any) => response.exists && response.passwordMatch),
      catchError((error: any) => {
        console.error('Error checking if user exists:', error);
        return of(false);
      })
    );
  }
  getUserData(){
    return this.http.get<Customer>('/api/customers');
  }
  editUserData(editedUserData: {
    firstName: any;
    lastName: any;
    email: any;
    phone: any;
    address: any;
    city: any;
    zipCode: any;
    country: any;
  }) {
    return this.http.put<Customer>('/api/customers', editedUserData);
  }
  

}
