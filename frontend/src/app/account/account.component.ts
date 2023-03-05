import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../interfaces/customer';
import { UserService } from '../user.service';
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

    editUserData(){
      
    }
}
