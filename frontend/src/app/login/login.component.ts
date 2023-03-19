import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})

@Injectable({
  providedIn:'root'
})

export class LoginComponent implements OnInit{
  title = 'Login';
  errorMessage = '';
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient, 
    private router: Router, 
    private userService: UserService) {

      this.loginForm= this.formBuilder.group({
        email:new FormControl('',[Validators.required, Validators.email]),
        password: new FormControl('',[Validators.required, Validators.minLength(8)])
      });
    }

  ngOnInit(): void {}

  checkUserExists(){

    console.log('Inside checkUserExists()');

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.userService.checkEmailExists(email).subscribe(
      (response: {exists: boolean, password: string;}) => {

        console.log('response.password: ', response.password);
        console.log('password: ', password);
        console.log(response);
        console.log('password length:', password.length);

        if (!response.exists) {
          this.errorMessage = 'User does not exist';
        } else if (response.password.trim() !== password.trim()) {
            this.errorMessage = 'Incorrect password';
        } else {
          // Call login endpoint
          const loginData = { email: email, password: password };
          this.http.post('/api/login', loginData).subscribe(
            (response: any) => {
              console.log('Login successful');
              // Set session ID
              sessionStorage.setItem('sessionId', response.sessionId);
              const sessionId = sessionStorage.getItem('sessionId');
                if (sessionId) {
                  const headers = { Authorization: sessionId };
                  this.http.get('/api/someEndpoint', { headers }).subscribe(
                    (response: any) => {
                      console.log(response);
                    },
                    (error: any) => {
                      console.log(error);
                    }
  );
}
              this.router.navigate(['/account']);
            },
            (error: any) => {
              console.log('Error logging in: ', error.message);
              this.errorMessage = 'Error logging in';
            });
  }
});
  }

  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }
  getFormValidationErrors() {
    const errors: string[] = [];
    Object.keys(this.loginForm.controls).forEach(key => {
      const controlErrors = this.loginForm.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          errors.push(key + ' ' + keyError);
        });
      }
    });
    return errors;
}
}
