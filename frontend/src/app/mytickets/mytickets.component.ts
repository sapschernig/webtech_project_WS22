import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from '../interfaces/ticket';
import { NgFor } from '@angular/common';
import { Customer } from '../interfaces/customer';
import { Movie } from '../interfaces/movie';
import { Showtime } from '../interfaces/showtime';



@Component({
  selector: 'app-mytickets',
  templateUrl: './mytickets.component.html',
  styleUrls: ['./mytickets.component.scss']
})
export class MyticketsComponent implements OnInit {

  tickets: any[] = [];
  movies: Movie[] = [];
  seats: any[] = [];
  rows:number = 0;
  showtimes: Showtime[] = [];

  userData: Customer | undefined;
  message: string='';


  

  constructor(private http: HttpClient) {
    
  }


  ngOnInit() {
    this.http.get<Ticket[]>('/api/mytickets').subscribe(
      (tickets) => {
        this.tickets = tickets;
      },
      (error) => {
        console.error(error);
      }
    );
    this.http.get<Showtime[]>('/api/showtimes').subscribe(
      (showtimes) => {
        this.showtimes = showtimes;
      },
      (error) => {
        console.error(error);
      }
    );
    this.http.get<any[]>('/api/movies').subscribe(
      (movies) => {
        this.movies = movies;
      },
      (error) => {
        console.error(error);
      }
    );
    this.http.get<any[]>('/api/seat').subscribe(
      (seats) => {
        this.seats = seats; /**/
      },
      (error) => {
        console.error(error);
      }
    );


    this.http.get('/api/account').subscribe(
      (data) => {
        console.log(data);
        this.userData = data as Customer;  
        console.log(this.userData.first_name);
        console.log(this.userData.id);
      },
      (error) => {
        console.log(error);
        this.message = 'Error fetching user data';
      }
    );
    
  }

  cancelTicket(id:number) {

    this.http.post('/api/deleteTicket', {id}).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    window.location.reload();
    
  }

}
