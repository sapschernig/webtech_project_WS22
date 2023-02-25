import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Showtime } from '../showtime';



@Component({
  selector: 'app-moviecard',
  templateUrl: './moviecard.component.html',
  styleUrls: ['./moviecard.component.scss']
})

export class MoviecardComponent implements OnInit{
  movies: any[] = [];
  showtimes: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('/api/movies').subscribe(
      (movies) => {
        this.movies = movies;
      },
      (error) => {
        console.error(error);
      }
    );

    this.http.get<Showtime[]>('http://localhost:3000/show').subscribe(
      (showtimes) => {
        this.showtimes = showtimes;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
