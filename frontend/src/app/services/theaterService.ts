import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Theater } from '../interfaces/theater';

@Injectable({
  providedIn: 'root'
})
export class TheaterService {

  private apiUrl: string = '/api/theater';

  constructor(private http: HttpClient) { }

  getAllTheaters(): Observable<Theater[]> {
    return this.http.get<Theater[]>(this.apiUrl);
  }

  getTheater(id: number): Observable<Theater> {
    return this.http.get<Theater>('api/theater/${id}');
  }

  addTheater(theater: Theater): Observable<any> {
    return this.http.post<any>('/api/theater/add', theater);
  }

  updateTheater(theater: Theater): Observable<any> {
    return this.http.put(`/api/theater/${encodeURIComponent(theater.id)}`, theater);
  }
  deleteTheater(id: number): Observable<any> {
    const url = '/api/theater/${id}';
    return this.http.delete(url)
      .pipe(
        catchError(error => {
          if (error.status === 409) {
            return throwError('Theater has associated shows and cannot be deleted');
          } else {
            return throwError('An error occurred while deleting the theater');
          }
        })
      );
  }
   
  
}