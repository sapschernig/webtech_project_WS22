import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin, map, mergeMap, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MovieService {
    constructor(private http: HttpClient) { }

    getWeeklyShowtimes(sortField: string, sortDirection: string): Observable<any[]> {
        // set up the query parameters for the API call
        let params = new HttpParams();
        // params = params.append('start_date', moment().startOf('week').format('YYYY-MM-DD'));
        // params = params.append('end_date', moment().endOf('week').format('YYYY-MM-DD'));
      
        return this.http.get<any[]>('api/showtimes', { params }).pipe(
          mergeMap(showtimes => {
            // get an array of movie ids from the showtimes
            const movieIds = showtimes.map(showtime => showtime.movie_id);
      
            // retrieve the movies that match the ids
            const movies$ = this.http.get<any[]>('api/movies', {
              params: new HttpParams().set('id', movieIds.join())
            });
      
            // get an array of theater ids from the showtimes
            const theaterIds = showtimes.map(showtime => showtime.theater_id);
      
            // retrieve the theaters that match the ids
            const theaters$ = this.http.get<any[]>('api/theater', {
              params: new HttpParams().set('id', theaterIds.join())
            });
      
            return forkJoin([movies$, theaters$]).pipe(
              map(([movies, theaters]) => {
                // combine the showtimes, movies, and theaters data
                return showtimes.map(showtime => {
                  const movie = movies.find(movie => movie.id === showtime.movie_id);
                  const theater = theaters.find(theater => theater.id === showtime.theater_id);
                  return {
                    id: showtime.id,
                    movie_id: showtime.movie_id,
                    theater_id: showtime.theater_id,
                    start_time: showtime.start_time,
                    date: showtime.date,
                    movie_title: movie ? movie.title : null,
                    theater_name: theater ? theater.name : null
                  };
                });
              })
            );
          }),
          map(data => {
            return data;
          }))
          
        //   map(data => {
        //     // sort the data based on the sort field and direction
        //     data.sort((a, b) => {
        //       const fieldA = a[sortField];
        //       const fieldB = b[sortField];
        //       if (fieldA < fieldB) {
        //         return sortDirection === 'asc' ? -1 : 1;
        //       } else if (fieldA > fieldB) {
        //         return sortDirection === 'asc' ? 1 : -1;
        //       } else {
        //         return 0;
        //       }
        //     });
      
        //     return data;
        //   })
        // );
            
          
      }
      getMovieDuration(movieId: number) {
        return this.http.get<number>(`api/movies/${movieId}/duration`);
      }
}

function moment() {
    throw new Error('Function not implemented.');
}
