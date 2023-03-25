import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movieService';
import { TheaterService } from '../services/theaterService';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manage-showtimes',
  templateUrl: './manage-showtimes.component.html',
  styleUrls: ['./manage-showtimes.component.scss']
})
export class ManageShowtimesComponent implements OnInit{
  title = 'Manage Showtimes';

  showtimes: any[] = [];
  //to keep track of the currently sorted field and sorting direction
  sortField: string = '';
  sortDirection: string = '';
  movies: any[] | undefined;
  theaters: any[] | undefined;

  constructor(
    private showtimesService: MovieService,
    private theaterService: TheaterService,
    private http: HttpClient) { }

  ngOnInit() {
    this.fetchData();
    this.http.get<any[]>('api/movies').subscribe(movies => {
      this.movies = movies;
    });
    this.getTheaters();
  }

  getTheaters() {
    this.http.get<any[]>('/api/theater').subscribe(theaters => {
      this.theaters = theaters;
    });
  }

  fetchData() {
    this.showtimesService
      .getWeeklyShowtimes(this.sortField, this.sortDirection)
      .subscribe(
        (data) => {
          console.log('data:', data);
          this.showtimes = data.map((showtime) => ({
            id: showtime.id,
            movie_id: showtime.movie_id,
            theater_id: showtime.theater_id,
            start_time: showtime.start_time,
            date: showtime.date,
            movie_title: showtime.movie_title || '',
            theater_name: '',
          }));

          // Get the theater names for each showtime
          this.showtimes.forEach((showtime) => {
            this.theaterService.getTheater(showtime.theater_id).subscribe(
              (theater) => {
                showtime.theater_name = theater.name;
              },
              (error) => {
                console.log(error);
              }
            );
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  sort(field: string) {
    // If the field to sort is the same, toggle the sorting direction. Otherwise, reset to default (ascending).
    if (field === this.sortField) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }

    this.fetchData();
  }
}