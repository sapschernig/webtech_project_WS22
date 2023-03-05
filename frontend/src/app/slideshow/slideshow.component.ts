import { Component } from '@angular/core';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent {
  images = ['assets/pictures/current_movies/darkknight.jpg', 'assets/pictures/current_movies/godfather.jpg', 'assets/pictures/current_movies/jurassicpark.jpg', 'assets/pictures/current_movies/shawshank.jpg'];

}
