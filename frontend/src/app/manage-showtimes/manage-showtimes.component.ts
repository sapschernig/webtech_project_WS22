import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movieService';
import { TheaterService } from '../services/theaterService';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { showtimesService } from '../services/showtimeService';
import { map, tap } from 'rxjs';
import * as moment from 'moment';



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
  showtimeAvailable: boolean = false;
  showtimeMessage: string | undefined;
  submitDisabled: boolean | undefined;

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

    //get movie duration
    const duration = this.movies?.find(movie => movie.id === movieId)?.duration;

    if(duration){
      //calculate end time
      const endTime= moment('${date} ${time}', 'YYYY-MM-DD HH:mm:ss').add(duration, 'minutes').format('YYYY-MM-DD HH:mm:ss');

    this.showtimeService.getShowtimesByTheaterAndTime(theaterId, date, time).subscribe(
      (showtimeExists) => {
        console.log('Showtime exists:', showtimeExists);
        if (showtimeExists) {
          console.log('Showtime already exists');
          this.showtimeAvailable = false;
          this.showtimeMessage = 'Showtime is not available';
        } else {
          console.log('Showtime is available');
          this.showtimeAvailable = true;
          this.showtimeMessage = 'Showtime is available';
        }
        this.submitDisabled = !this.showtimeAvailable;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  }
  onSubmit(){
    console.log('Form submitted');

    //retrieve data from form
    const movieId = this.showtimeForm.get('movieSelect')?.value;
    const theaterId = this.showtimeForm.get('theaterSelect')?.value;
    const date = this.showtimeForm.get('dateInput')?.value;
    let time = this.showtimeForm.get('timeInput')?.value;
    time += ':00';

    // Call the addShowtime method of the ShowtimeService
  this.showtimeService.addShowtime(movieId, theaterId, date, time).subscribe(
    (response) => {
      console.log('Showtime added:', response);
      // Clear the form
      this.showtimeForm.reset();
      // Disable the submit button again
      this.showtimeAvailable = false;
    },
    (error) => {
      console.log('Error adding showtime:', error);
    }
  );

  }


}