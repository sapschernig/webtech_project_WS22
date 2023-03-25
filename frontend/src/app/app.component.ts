
import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './app-service.service';
import { lastValueFrom } from 'rxjs';

import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'webtech-projekt';
  hideSlideshow = false;

  constructor(private service : AppServiceService) {

  }

  ngOnInit() {

    this.getDataFromAPI();

  }

  async getDataFromAPI() {
    try {
      // Call the 'getTest()' method from a service that returns an Observable
      const res = await lastValueFrom(this.service.getTest());
      console.log('Response from API is: ', res);
    } catch (err) {
      console.log('Error: ', err);
    }
  }
  



export class AppComponent {
  title = 'webtech-projekt';

}
