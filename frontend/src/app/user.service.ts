import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  registerUser(email:string, password: string, firstName: string, lastName: string, phone: string, address: string, zipCode: string, city: string, country: string) {
    const url = '${this.baseUrl}/api/register';
    const data = { email, password, first_name: firstName, last_name: lastName, phone, address, zipcode: zipCode, city, country};
    return this.http.post(url, data);
  }

}
