import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from '../interfaces/ticket';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-mytickets',
  templateUrl: './mytickets.component.html',
  styleUrls: ['./mytickets.component.scss']
})
export class MyticketsComponent implements OnInit {

  tickets: any[] = [];
  movies: any[] = [];
  seats: any[] = [];

  

  constructor(private http: HttpClient) {
    
  }

  ngOnInit() {
    this.http.get<Ticket[]>('/api/ticket').subscribe(
      (tickets) => {
        this.tickets = tickets;
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

    
    
  }

}
