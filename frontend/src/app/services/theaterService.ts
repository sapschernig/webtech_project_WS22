import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    return this.http.get<Theater>(`${this.apiUrl}/${id}`);
  }

  addTheater(theater: Theater): Observable<any> {
    return this.http.post<any>('/api/theater/add', theater);
  }

  updateTheater(theater: Theater): Observable<any> {
    return this.http.put(`${this.apiUrl}/${theater.id}`, theater);
  }
  deleteTheater(theaterId: number): Observable<void> {
    const url = `${this.apiUrl}/theater/${theaterId}`;
    return this.http.delete<void>(url);
  }
  
}