import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Showtime } from '../interfaces/showtime';

@Injectable({
  providedIn: 'root'
})
export class showtimesService {

  private apiBaseUrl = '/api';

  constructor(private http: HttpClient) { }

  postShowtime(showtime: any): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/showtimes`, showtime);
  }
  getShowtimesByTheaterAndTime(theaterId: number, date: string, time: string): Observable<boolean> {
    return this.http.get<Showtime[]>(`${this.apiBaseUrl}/showtimes`)
        
      .pipe(
        map((showtimes) => {
          const result = showtimes.some((showtime) => {
            const showtimeDate = new Date(showtime.date).toLocaleDateString('en-US');
            const showtimeTime = new Date(`1970-01-01T${showtime.start_time}Z`).toLocaleTimeString('en-US', {hour12: true});
            console.log('Comparing:', showtime.theater_id, showtimeDate, showtimeTime);
            console.log('With:', theaterId, date, time);
            return showtime.theater_id === theaterId && showtimeDate === date && showtimeTime === time;
        });
            console.log('Result:', result);
            return result;
          })
          
      );
  }

  
}
