import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Showtime } from '../interfaces/showtime';



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
  theater: any[] = [];
  selectedMovie: string ='';
  selectedDate: string = '';
  selectedShow: string = '';
  seatIdList: string[] = [];
  seatCount = 0;
  totalPrice = 0;
  numberSeats = 0;
  

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

    this.http.get<any[]>('/api/theater').subscribe(
      (theater) => {
        this.theater = theater;
      },
      (error) => {
        console.error(error);
      }
    );

  }

   numSequence(n: number): Array<number> {
    return Array(n);} 
  

    onMovieChange(): void{
      let seat = document.getElementsByClassName('seat');
        for(let i = 0; i<seat.length; i++){
        seat[i].classList.remove('occupied');
        seat[i].classList.remove('selected');
        seat[i].classList.remove('deluxe');
        }
        while(this.seatIdList.length>0){
          this.seatIdList.pop();
        }
        this.seatCount = 0;
        this.totalPrice = 0;
    }

    onSelectionChange(): void {
      for(let t of this.theater){
        let idString = t.id.toString();
        if(this.selectedShow == idString)
        this.numberSeats = t.capacity/20;
      }

      let seat = document.getElementsByClassName('seat');

      for(let i = (this.numberSeats-1)*20+1; i <=this.numberSeats*20; i++){
        seat[i-1].classList.add('deluxe');
        }

    for(let ticket of this.tickets){
      if(this.selectedShow == ticket.show_id){
        seat[ticket.seat_id-1].classList.add('occupied')
      }
    }
    this.seatCount = 0;
    this.totalPrice = 0;
  }



    addToSeatIdList(id: number){

      if(this.selectedMovie != "" && this.selectedDate !="" && this.selectedShow != ""){
      let seat = document.getElementsByClassName('seat');
      let idString = id.toString();
      const index = this.seatIdList.indexOf(idString);

      if(this.seatIdList.includes(idString)){
        seat[id-1].classList.remove('selected');
        this.seatIdList.splice(index,1);

        this.seatCount -= 1;
        this.totalPrice -= 12.50;
        if(parseFloat(seat[id].id)>(this.numberSeats-1)*20+1){
          this.totalPrice -= 2.0;
        }
      } else
      if(!seat[id-1].classList.contains('occupied')){
        this.seatIdList.push(idString);
        seat[id-1].classList.add('selected');
        this.seatCount += 1;
        this.totalPrice += 12.50;
        if(parseFloat(seat[id].id)>(this.numberSeats-1)*20+1){
          this.totalPrice += 2.0;

        }
      }
    }
    }

}