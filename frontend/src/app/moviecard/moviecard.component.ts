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

  calculateRating(x: number): string{
    let i = 0;
    let ratingmovie = 0;
  for(let r of this.rating){
    if(x == r.movie_id){
      i++;
      ratingmovie += r.rating;
  }
  }
let average = (ratingmovie/i).toFixed(1);
return average;
  }

}
