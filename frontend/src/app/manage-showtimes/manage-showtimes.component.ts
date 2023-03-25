import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movieService';

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

  constructor(private showtimesService: MovieService) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.showtimesService.getWeeklyShowtimes(this.sortField, this.sortDirection).subscribe(
      data => {
        console.log('data:', data);
        this.showtimes = data.map(showtime => ({
          id: showtime.id,
          movie_id: showtime.movie_id,
          theater_id: showtime.theater_id,
          start_time: showtime.start_time,
          date: showtime.date,
          movie_title: showtime.movie_title || '', // use a ternary operator to check if the movie_title is defined
          theater_name: showtime.theater ? showtime.theater.name : '' // use a ternary operator to check if the theater object is defined
        }));
      },
      error => {
        console.log(error);
      }
    );
  }
  

  sort(field: string) {
    //If the field to sort is the same, toggle the sorting direction. Otherwise, reset to default (ascending).
    if (field === this.sortField) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }

    this.fetchData();
  }
}
