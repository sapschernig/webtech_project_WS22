import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Showtime } from '../interfaces/showtime';
import { Ticket } from '../interfaces/ticket';



@Component({
  selector: 'app-seatselect',
  templateUrl: './seatselect.component.html',
  styleUrls: ['./seatselect.component.scss']
})
export class SeatselectComponent implements OnInit {

  movies: any[] = [];
  showtimes: any[] = [];
  theaters: any[] = [];
  tickets: any[] = [];
  selectedMovie: any;
  selectedDate: any;
  selectedShow: any;
  seatIdList: number[] = [];

  

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

    this.http.get<any[]>('/api/ticket').subscribe(
      (tickets) => {
        this.tickets = tickets;
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
  }

   numSequence(n: number): Array<number> {
    return Array(n);} 
  

    onSelectionChange(): void {
    for(let ticket of this.tickets){
      if(this.selectedShow == ticket.show_id){
        let seat = document.getElementsByClassName('seat');
        seat[ticket.seat_id-1].classList.add('occupied')
      }
    }
  }

    onMovieChange(): void{
        let seat = document.getElementsByClassName('seat');
        for(let i = 0; i<seat.length; i++){
        seat[i].classList.remove('occupied')
        }
    }

    addToSeatIdList(id: number){
      this.seatIdList.push(id);
      let seat = document.getElementsByClassName('seat');
      seat[id-1].classList.add('selected')
    }

  /*
  changeSeatClass(n: number): void {
    let seat = document.getElementsByClassName('seat')[n];
    seat.classList.add('occupied')
  }

  ngAfterViewInit(): void{
    this.checkSeat();
  }  */

  }



/*
  const container = document.querySelector('.container');
  const seats = document.querySelectorAll('.row .seat:not(.occupied)');
  const count = document.getElementById('count');
  const total = document.getElementById('total');
  const movieSelect = document.getElementById('movie');
  
  var ticketPrice = +movieSelect.value;
  
  //Update total and count
  function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
  }
  
  //Movie Select Event
  movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    updateSelectedCount();
  });
  
  //Seat click event
  container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') &&
       !e.target.classList.contains('occupied')) {
      e.target.classList.toggle('selected');
    }
    updateSelectedCount();
  });
}*/
