import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  title = 'Login';
  errorMessage = '';
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}


  ngOnInit(): void {
    this.loginForm= this.formBuilder.group({
      email:new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)])
    });
  }

  checkUserExists(){
    const email = this.loginForm.get('email')?.value;
    this.http.get<boolean>('api/checkUserExists/${email}').subscribe(
      (userExists) => {
      if(userExists){
        this.errorMessage = 'A user with this email already exists';
      } else {
        this.errorMessage = '';
      }
    },
    error => {
      this.errorMessage = 'An error occurced while checking if the user exists';
      console.error(error);
    });
  }

  
  
  loginUser(){
    console.warn(this.loginForm.value)
  }

  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }
}
