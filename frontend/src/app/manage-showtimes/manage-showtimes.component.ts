import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movieService';
import { TheaterService } from '../services/theaterService';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { showtimesService } from '../services/showtimeService';
import { map, tap } from 'rxjs';


@Component({
  selector: 'app-manage-showtimes',
  templateUrl: './manage-showtimes.component.html',
  styleUrls: ['./manage-showtimes.component.scss']
})
export class ManageShowtimesComponent implements OnInit{
  title = 'Manage Showtimes';
  showtimeForm: FormGroup;

  showtimes: any[] = [];
  //to keep track of the currently sorted field and sorting direction
  sortField: string = '';
  sortDirection: string = '';
  movies: any[] | undefined;
  theaters: any[] | undefined;
  movieSelect!: string;

  constructor(
    private showtimesService: MovieService,
    private theaterService: TheaterService,
    private http: HttpClient,
    private showtimeService: showtimesService,
    private formBuilder: FormBuilder
    ) { 
      this.showtimeForm = this.formBuilder.group({
        movieSelect: ['', Validators.required],
        theaterSelect: ['', Validators.required],
        dateInput: ['', Validators.required],
        timeInput: ['', Validators.required]
    });
    
  }

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

  getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getDefaultTime() {
    const now = new Date();
    const minimumTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 0, 0);
    const defaultTime = new Date(Math.max(now.getTime(), minimumTime.getTime()));
    const defaultTimeString = defaultTime.toTimeString().split(' ')[0];
    return defaultTimeString;
  }
  

  getMinimumTime(): Date {
    const now = new Date();
    const minimumTime = new Date();
    minimumTime.setHours(15, 0, 0, 0); // set minimum time to 3pm
    return new Date(Math.max(now.getTime(), minimumTime.getTime()));
  }

  fetchData() {
    this.showtimesService
      .getWeeklyShowtimes(this.sortField, this.sortDirection)
      .subscribe(
        (data) => {
          console.log('data:', data);
          const currentDate = new Date();
          this.showtimes = data
          .filter((showtime) => new Date(showtime.date) >= currentDate)
          .map((showtime) => ({
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
  checkAvailability(){
    console.log('checkAvailability() function called');
    const movieId = this.showtimeForm.get('movieSelect')?.value;
    const theaterId = this.showtimeForm.get('theaterSelect')?.value;
    const date = this.showtimeForm.get('dateInput')?.value;
    let time = this.showtimeForm.get('timeInput')?.value;
    time += ':00';

    console.log('Movie:', movieId);
    console.log('Theater:', theaterId);
    console.log('Date:', date);
    console.log('Time:', time);

    this.showtimeService.getShowtimesByTheaterAndTime(theaterId, date, time).subscribe(
      (showtimeExists) => {
        console.log('Showtime exists:', showtimeExists);
        if (showtimeExists) {
          console.log('Showtime already exists');
        } else {
          console.log('Showtime is available');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}