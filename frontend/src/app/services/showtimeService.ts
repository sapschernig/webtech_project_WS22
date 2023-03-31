import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Showtime } from '../interfaces/showtime';
import { format } from 'date-fns';


@Injectable({
  providedIn: 'root'
})
export class showtimesService {

  private apiBaseUrl = '/api';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }


  getShowtimes(): Observable<Showtime[]> {
    return this.http.get<Showtime[]>('api/showtimes')
  }

  postShowtime(showtime: any): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/showtimes`, showtime);
  }
  getShowtimesByTheaterAndTime(theaterId: number, date: string, time: string): Observable<boolean> {
    return this.http.get<Showtime[]>(`${this.apiBaseUrl}/showtimes`)
        
      .pipe(
        map((showtimes) => {
          const result = showtimes.some((showtime) => {
            //const showtimeDate = new Date(showtime.date).toLocaleDateString('en-US');
            const showtimeDate2 = format(new Date(showtime.date), 'yyyy-MM-dd');
            const showtimeDateForm = format(new Date(date), 'yyyy-MM-dd');

            //const showtimeTime = new Date(`1970-01-01T${showtime.start_time}Z`).toLocaleTimeString('en-US', {hour12: true});
            console.log('Comparing:', showtime.theater_id, showtimeDate2, showtime.start_time);
            console.log('With:', theaterId, showtimeDateForm, time);

            return +showtime.theater_id === +theaterId && showtimeDate2 === showtimeDateForm && showtime.start_time === time;
        });
            console.log('Result:', result);
            return result;
          })
          
      );
  }

  isShowtimeAvailable(movieId: number, theaterId: number, date: string, startTime: string): Observable<boolean> {
    console.log('isShowtimeAvailable called with', movieId, theaterId, date, startTime);
    const query = 'SELECT COUNT(*) FROM showtimes WHERE movie_id = $1 AND theater_id = $2 AND date = $3 AND start_time = $4';
    const values = [movieId, theaterId, date, startTime];
    const body = { query, values };
    return this.http.post<{count: number}>('/api/check-availability', body)
        .pipe(map(response => {
            console.log('isShowtimeAvailable response', response);
            return response.count === 0; // return true if count is 0, false otherwise
        }));
}



  
addShowtime(movieId: number, theaterId: number, date: string, time: string): Observable<any> {
  const data = {
    movie_id: movieId,
    theater_id: theaterId,
    date: date,
    start_time: time
  };
  console.log('data:', data);
  return this.http.post<any>('/api/showtimes', data);
}

  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  updateShowtime(showtime: Showtime, id: number): Observable<Showtime> {
    const url = `${this.apiBaseUrl}(showtimes/${id}`;
    return this.http.put<Showtime>(url, showtime, this.httpOptions)
      .pipe(
        tap(_ => console.log(`updated showtime id=${showtime.id}`)),
        catchError(error => this.handleError(error))
      );
  }
  deleteShowtime(id: number): Observable<any> {
    const url = `${this.apiBaseUrl}showtimes/${id}`;
    return this.http.delete(url, this.httpOptions)
      .pipe(
        tap(_ => console.log(`deleted showtime id=${id}`)),
        catchError(error => this.handleError(error))
      );
  }
  


  
  
}
