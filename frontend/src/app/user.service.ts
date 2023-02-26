import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
  checkEmailExists(email: string): Observable<{ exists: boolean }> {
    const url = `${this.apiUrl}/checkUserExists/${email}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        return { exists: response.exists } as { exists: boolean };
      }),
      catchError((error: any) => {
        console.error('Error checking if email exists:', error);
        return of({ exists: false });
      })
    );
  }

}
