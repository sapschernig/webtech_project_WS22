import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit{
  title = 'Login';
  errorMessage = '';
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private userService: UserService) {}


  ngOnInit(): void {
    this.loginForm= this.formBuilder.group({
      email:new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)])
    });
  }

  checkUserExists(){
    console.log('Inside checkUserExists()');
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.userService.checkEmailExists(email).subscribe(
      (response) => {
        if(response.exists){
          console.log('Inside userExists');
          this.errorMessage = '';
          this.router.navigate(['/user']);
          return;
        } else {
          this.errorMessage = 'No user with this email exists';
        }
        this.loginForm.reset();
      },
      error => {
        this.errorMessage = 'An error occurred while checking if the user exists';
        console.error(error);
      });
  }
  
  loginUser(){
    this.checkUserExists();
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
