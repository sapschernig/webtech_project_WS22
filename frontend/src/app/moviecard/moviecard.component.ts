import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-moviecard',
  templateUrl: './moviecard.component.html',
  styleUrls: ['./moviecard.component.scss']
})

export class MoviecardComponent implements OnInit{
  movies: any[];

  constructor(private http: HttpClient) { 
    this.movies = []; //initialize movie property
  }

  ngOnInit(): void {
    this.http.get<any[]>('/api/movies')
      .subscribe(data => {
        this.movies = data;
      }, error => {
        console.error(error);
      });
  }
}
