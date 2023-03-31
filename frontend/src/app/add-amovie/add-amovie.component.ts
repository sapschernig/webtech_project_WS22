import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-amovie',
  templateUrl: './add-amovie.component.html',
  styleUrls: ['./add-amovie.component.scss'],
  providers: [DatePipe]
})
export class AddAMovieComponent implements OnInit{

  title = 'Add a movie';
  errorMessage: string = '';
  addMovieForm!: FormGroup;
  movies: any[]= [];
  
  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient, 
    private userService: UserService,
    private router: Router,
    private datePipe: DatePipe,
    ) {}
  
  
  ngOnInit(): void {
    this.http.get<any[]>('/api/movies').subscribe(
      (movies) => {
        this.movies = movies;
      },
      (error) => {
        console.error(error);
      }
    );



  this.addMovieForm= this.formBuilder.group({
    title: ['', Validators.required],
    releaseDate: ['', Validators.required],
    duration: ['', Validators.required],
    ageRestriction: ['', Validators.required],
    genre: ['', Validators.required],
    description: ['', Validators.required]
  });
}

  addMovie() {
    const formData = this.addMovieForm.value;
    const formattedDate = this.datePipe.transform(formData.releaseDate, 'yyyy-MM-dd');
    console.log(formData.releaseDate);
    console.log(formData);
    console.log(formattedDate);

    const movie = {
      title: formData.title,
      release_date: formattedDate,
      duration: formData.duration,
      age_restriction: formData.ageRestriction,
      genre: formData.genre,
      description: formData.description
    };
    

    this.http.post('/api/movies', movie)
    .subscribe(
      response => {
        console.log(response);
        // Reset the form values after a successful add
        this.addMovieForm.reset();
      },
      error => {
        console.log(error);
      }
    );
  
  }

  deleteMovie(id:number) {
    if (confirm('Attention! Delete showtimes first before deleting the movie!')) {
    this.http.post('/api/deleteMovie', {id}).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    window.location.reload();
    }
  }
}