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

registerUser() {
  this.checkUserExists();
  if(this.errorMessage){
    return;
  }

  this.http.post('/api/register', this.registerForm.value).subscribe(
    () => {
      //creation successfully, go to login or something
    },
    (error) => {
      console.error(error);
      this.errorMessage='An error occurred while creating the user';
    }
  )
  
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
