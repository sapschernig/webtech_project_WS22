import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../interfaces/customer';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Ticket } from '../interfaces/ticket';

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
  customerTickets: Ticket[] = [];

  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient, 
    private userService: UserService,
    private router: Router) {}
  
  
    ngOnInit(): void {
      /*this.userService.getUserData().subscribe(
        data => {
          this.userData = data;
        },
        error => console.error(error)
      );*/
      const customerId = '12345'; // replace with the actual customer ID
      this.getCustomerTickets(customerId);
    }
  
    editUserData() {
        
    }
  
    getCustomerTickets(customerId: string) {
      this.http.get<Ticket[]>(`/api/tickets/${customerId}`).subscribe(
        data => {
          this.customerTickets = data;
        },
        error => {
          console.error(error);
          this.errorMessage = 'Error retrieving customer tickets';
        }
      );
    }
  }
