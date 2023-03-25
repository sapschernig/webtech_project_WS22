import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Showtime } from '../interfaces/showtime';
import { Customer } from '../interfaces/customer';
import { Ticket } from '../interfaces/ticket';
import { LoginComponent } from '../login/login.component';



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
  selectedMovie: string ='';
  selectedDate: string = '';
  selectedShow: string = '';
  seatIdList: string[] = [];
  seatCount = 0;
  totalPrice = 0;
  message: string='';
  userData: Customer | undefined;


  

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

    this.http.get('/api/account').subscribe(
      (data) => {
        console.log(data);
        this.userData = data as Customer;  
        console.log(this.userData.first_name);
        console.log(this.userData.id);
      },
      (error) => {
        console.log(error);
        this.message = 'Error fetching user data';
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
    this.seatCount = 0;
    this.totalPrice = 0;
  }

    onMovieChange(): void{
        let seat = document.getElementsByClassName('seat');
        for(let i = 0; i<seat.length; i++){
        seat[i].classList.remove('occupied');
        seat[i].classList.remove('selected');
        }

      for(let i = 25; i <=32; i++){
      seat[i-1].classList.add('deluxe');
      }
        while(this.seatIdList.length>0){
          this.seatIdList.pop();
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
        if(parseFloat(seat[id].id)>25){
          this.totalPrice -= 2.0;
        }
      } else
      if(!seat[id-1].classList.contains('occupied')){
        this.seatIdList.push(idString);
        seat[id-1].classList.add('selected');
        this.seatCount += 1;
        this.totalPrice += 12.50;
        if(parseFloat(seat[id].id)>25){
          this.totalPrice += 2.0;

        }
      }
    }
    }

    bookTicket() {
      console.log("Test");
      console.log(this.selectedMovie);
      console.log(this.selectedShow);
      console.log(this.seatIdList[0]);
      console.log(this.tickets.length);


      console.log(sessionStorage);

      let i = 0;

      while (i < this.seatIdList.length) {

      

        const data = {
          id: this.tickets.length + 1 + i,
          price: this.totalPrice/this.seatIdList.length,
          show_id: this.selectedShow,
          seat_id: this.seatIdList[i],
          customer_id: this.userData?.id
        };
        this.http.post('/api/ticket', data).subscribe(
          (response) => {
            this.message = 'Ticket created successfully';
          },
          (error) => {
            console.error(error);
            this.message = 'Error creating ticket';
          }
        );

        i++;

      }

      





    }

      




    }

    


