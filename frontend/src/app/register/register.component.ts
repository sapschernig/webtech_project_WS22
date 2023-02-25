import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../interfaces/customer';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  title = 'Register';
  errorMessage = '';
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}
  
  
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


registerUser() {
  // Check if user already exists
  this.http.get<boolean>(`/api/checkUserExists/${this.registerForm.value.email}`)
    .subscribe((userExists) => {
      if (userExists) {
        // User already exists, show error message
        this.errorMessage = 'User already exists';
      } else {
        // User does not exist, create new user
        this.http.post('/api/createUser', this.registerForm.value)
          .subscribe(() => {
            // User created successfully, navigate to login page or show success message
          }, (error) => {
            // Handle error
            console.error(error);
            this.errorMessage = 'An error occurred while creating the user';
          });
      }
    }, (error) => {
      // Handle error
      console.error(error);
      this.errorMessage = 'An error occurred while checking if the user exists';
    });
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
