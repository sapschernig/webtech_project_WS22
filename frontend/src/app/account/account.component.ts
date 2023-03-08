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
  tickets: Ticket[] = [];

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
      const sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
      this.router.navigate(['/login']);
      return;
    }
    this.http.get('/api/account').subscribe(
      (data) => {
        this.userData = data as Customer;    
      },
      (error) => {
        console.log(error);
        this.errorMessage = 'Error fetching user data';
      }
    );

    const customerId = sessionStorage.getItem('customerId');
     if (customerId) {
      this.getCustomerTickets(customerId);
    } else {
      this.http.get<{ customer_id: string }>(`/api/session/${sessionId}`).subscribe(
        (data) => {
          sessionStorage.setItem('customerId', data.customer_id);
          this.getCustomerTickets(data.customer_id);
        },
        (error) => {
          console.error(error);
          this.errorMessage = 'Error fetching tickets';
        }
      );
    }
  }
  
  getCustomerTickets(customerId: string) {
    this.http.get<Ticket[]>(`/api/tickets/${customerId}`).subscribe(
      (data) => {
        this.tickets = data;
      },
      (error) => {
        console.error(error);
        this.errorMessage = 'Error fetching tickets';
      }
    );
  }

  editUserData() {}

}
