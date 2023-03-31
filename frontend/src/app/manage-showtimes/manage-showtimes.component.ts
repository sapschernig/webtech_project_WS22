import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MovieService } from '../services/movieService';
import { TheaterService } from '../services/theaterService';
import { showtimesService } from '../services/showtimeService';
import { Movie } from '../interfaces/movie';
import { Theater } from '../interfaces/theater';
import { Showtime } from '../interfaces/showtime';
import * as moment from 'moment';

@Component({
  selector: 'app-manage-showtimes',
  templateUrl: './manage-showtimes.component.html',
  styleUrls: ['./manage-showtimes.component.scss']
})
export class ManageShowtimesComponent implements OnInit {

  title = 'Manage showtimes'

  showtimeForm!: FormGroup;
  movies!: Movie[];
  theaters!: Theater[];
  showtimes!: Showtime[];
  showtimeAvailable: boolean | null = null;
  isEditMode = false;
  showtimeToEdit: Showtime | null | undefined;
  selectedMovie: any;
  showForm = false;
  isAddMode: boolean | undefined;

  constructor(
    private movieService: MovieService,
    private theaterService: TheaterService,
    private showtimeService: showtimesService
  ) { }

  toggleAddMode() {
    this.isAddMode = true;
    this.isEditMode = false;
    this.showtimeForm.reset();
  }  

  ngOnInit() {
    this.showtimeForm = new FormGroup({
      movieSelect: new FormControl(null, Validators.required),
      theaterSelect: new FormControl(null, Validators.required),
      dateInput: new FormControl(this.getCurrentDate(), Validators.required),
      timeInput: new FormControl(null, Validators.required)
    });

    this.movieService.getMovies()
      .subscribe(movies => this.movies = movies);

    this.theaterService.getAllTheaters()
      .subscribe(theaters => this.theaters = theaters);

    this.showtimeService.getShowtimes()
      .subscribe(showtimes => this.showtimes = showtimes);
  }

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  getMinimumTime(): string {
    const today = new Date();
    const hour = today.getHours();
    const minute = today.getMinutes() < 30 ? '30' : '00';
    return `${('0' + (hour + 1)).slice(-2)}:${minute}`;
  }
  getMovieTitle(movieId: number): string {
    const movie = this.movies.find(movie => movie.id === movieId);
    return movie ? movie.title : '';
  }
  
  getTheaterName(theaterId: number): string {
    const theater = this.theaters.find(t => t.id === theaterId);
    if (theater) {
      return theater.name;
    } else {
      return 'Theater not found';
    }
  }
  
  onSubmit(){
    if (this.isEditMode) {
      this.updateShowtime();
    } else {
      this.addShowtime();
    }
  }
  

  addShowtime() {
    const showtime = this.getShowtimeFromForm();
    this.showtimeService.addShowtime(showtime.movie_id, showtime.theater_id, showtime.date, showtime.start_time)
    .subscribe(showtime => {
      this.showtimes.push(showtime);
      this.showtimeForm.reset();
      this.showtimeAvailable = null;
  });
  }
  
  getShowtimeFromForm(): Showtime {
    const values = this.showtimeForm.value;
    const showtime: Showtime = {
      id: undefined,
      movie_id: values.movie,
      theater_id: values.theater,
      date: moment(values.date).format('YYYY-MM-DD'),
      start_time: values.start_time
    };
    return showtime;
  }
  
  

  editShowtime(showtime: Showtime) {
    this.showtimeToEdit = showtime;
    const date = moment(showtime.date).toDate();
    const formattedDate = moment(date).format('YYYY-MM-DD');
    
    this.showtimeForm.setValue({
      movieSelect: showtime.movie_id,
      theaterSelect: showtime.theater_id,
      dateInput: formattedDate,
      timeInput: showtime.start_time
    });
    this.isEditMode = true;
  }

  checkAvailability() {
    const movieId = this.showtimeForm.controls['movieSelect'].value;
    const theaterId = this.showtimeForm.controls['theaterSelect'].value;
    const date = this.showtimeForm.controls['dateInput'].value;
    const startTime = this.showtimeForm.controls['timeInput'].value;
  
    // Call the service method to check if the showtime is available
    this.showtimeService.isShowtimeAvailable(movieId, theaterId, date, startTime)
      .subscribe((available: boolean) => {
        this.showtimeAvailable = available;
      });
  }
  

  updateShowtime() {
    const showtime = this.getShowtimeFromForm();
    if (!this.showtimeToEdit || typeof this.showtimeToEdit.id !== 'number') {
      alert('Cannot update showtime - invalid ID');
      return;
    }
    showtime.id = this.showtimeToEdit.id;
    this.showtimeService.updateShowtime(showtime, this.showtimeToEdit.id)
      .subscribe(showtime => {
        const index = this.showtimes.findIndex(s => s.id === showtime.id);
        this.showtimes[index] = showtime;
        this.showtimeForm.reset();
        this.showtimeAvailable = null;
        this.isEditMode = false;
        this.showtimeToEdit = null;
      });
  }

  deleteShowtime(showtime: Showtime) {
    const confirmDelete = confirm("Are you sure you want to delete this showtime?");
    if (confirmDelete) {
      if (showtime.id !== undefined) {
        this.showtimeService.deleteShowtime(showtime.id).subscribe(() => {
          this.showtimes = this.showtimes.filter(st => st.id !== showtime.id);
        });
      }
    }
}


}
