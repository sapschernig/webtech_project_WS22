import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../interfaces/customer';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  title = 'Register';
  errorMessage = '';
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient, 
    private userService: UserService,
    private router: Router) {}
  
  
  ngOnInit(): void {
  this.registerForm= this.formBuilder.group({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email:new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(8)]),
    phone: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    zipCode: new FormControl('', Validators.required),
  });
}

checkUserExists(){
  const email = this.registerForm.get('email')?.value;
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

registerUser(): void {
  const { email, password, firstName, lastName, phone, address, zipCode, city, country } =
    this.registerForm.value;
  this.userService
    .registerUser(email, password, firstName, lastName, phone, address, zipCode, city, country)
    .subscribe(
      () => {
        console.log('User registered successfully');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log('Error registering user: ', error.message);
        if (error.status === 400) {
          this.errorMessage = 'User already exists';
        } else {
          this.errorMessage = 'Error registering user';
        }
      }
    );
}


  get email(){
    return this.registerForm.get('email');
  }
  get password(){
    return this.registerForm.get('password');
  }

  getFormValidationErrors() {
    const errors: string[] = [];
    Object.keys(this.registerForm.controls).forEach(key => {
      const controlErrors = this.registerForm.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          errors.push(key + ' ' + keyError);
        });
      }
    });
    return errors;
  }
  

  



}
