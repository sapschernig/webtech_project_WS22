import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Showtime } from '../interfaces/showtime';


@Component({
  selector: 'app-moviecard',
  templateUrl: './moviecard.component.html',
  styleUrls: ['./moviecard.component.scss']
})

export class MoviecardComponent implements OnInit{
  movies: any[] = [];
  showtimes: any[] = [];
  rating: any[] = [];
  ratingmovie = 0;

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

    this.http.get<Showtime[]>('/api/showtimes').subscribe(
      (showtimes) => {
        this.showtimes = showtimes.map((showtime) => {
          const date = new Date(showtime.time);
          return { ...showtime, time: date.toLocaleDateString() };
        });
      },
      (error) => {
        console.error(error);
      }
    );


    this.http.get<any[]>('/api/rating').subscribe(
      (rating) => {
        this.rating = rating;
      },
      (error) => {
        console.error(error);
      }
    );
    
  }

}
