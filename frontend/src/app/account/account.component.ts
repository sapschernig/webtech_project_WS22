import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../interfaces/customer';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit{
  title = 'Account';
  errorMessage: string = '';
  registerForm!: FormGroup;
  userData: Customer | undefined;
  isLoggedIn = false;

  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient, 
    private userService: UserService,
    private router: Router) {}
  
  
    ngOnInit(): void {
      this.userService.getUserData().subscribe(
        data => {
          this.userData = data;
        },
        error => console.error(error)
      );
    }

    logout() {
      // Send a POST request to the logout endpoint
      this.http.post('/api/logout', {}).subscribe(
        (response: any) => {
          console.log('Logout successful');
          // Clear session-related information
          sessionStorage.removeItem('sessionId');
          this.isLoggedIn = false;
          // Redirect to login page
          window.location.reload();
        },
        (error: any) => {
          console.log('Error logging out: ', error.message);
        }
      );
    }
}
