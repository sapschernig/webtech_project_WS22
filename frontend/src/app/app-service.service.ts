import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private http : HttpClient) { }

  getTest(){
    return this.http.get('/api/movies')
  }

  insertDataForBooking(id: number, price: number, show_id: number, seat_id: number, customer_id: number){
    return this.http.post('/ticket', {id, price, show_id, seat_id, customer_id});
  }

}
