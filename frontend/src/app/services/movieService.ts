import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, mergeMap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
    constructor(private http: HttpClient) { }

    getWeeklyShowtimes(sortField: string, sortDirection: string, filterMovieTitle?: string): Observable<any[]> {
        let params = new HttpParams();
        params = params.append('start_date', moment().startOf('week').format('YYYY-MM-DD'));
        params = params.append('end_date', moment().endOf('week').format('YYYY-MM-DD'));
      
       


        if (filterMovieTitle) {
          params = params.append('movie_title', filterMovieTitle);
        }
      
        return this.http.get<any[]>('api/showtimes', { params }).pipe(
            mergeMap((showtimes: any[]) : Observable<any[]> => {
              // get an array of movie ids from the showtimes
              const movieIds = showtimes.map(showtime => showtime.movie_id);
          
              // retrieve the movies that match the ids
              return this.http.get<any[]>('api/movies', {
                params: new HttpParams().set('id', movieIds.join())
              }).pipe(
                map(movies => {
                  // combine the showtimes and movies data
                  return showtimes.map(showtime => {
                    const movie = movies.find(movie => movie.id === showtime.movie_id);
                    return {
                      id: showtime.id,
                      movie_id: showtime.movie_id,
                      theater_id: showtime.theater_id,
                      start_time: showtime.start_time,
                      date: showtime.date,
                      movie_title: movie ? movie.title : null,
                      theater_name: showtime.theater && showtime.theater.name
                    };
                  });
                })
              );
            }),
            map(data => {
              // sort the data based on the sort field and direction
              data.sort((a, b) => {
                const fieldA = a[sortField];
                const fieldB = b[sortField];
                if (fieldA < fieldB) {
                  return sortDirection === 'asc' ? -1 : 1;
                } else if (fieldA > fieldB) {
                  return sortDirection === 'asc' ? 1 : -1;
                } else {
                  return 0;
                }
              });
          
              return data;
            })
          );
          
      }
    
}