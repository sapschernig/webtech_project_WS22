import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './app-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'webtech-projekt';

  constructor(private service : AppServiceService) {

  }

  ngOnInit() {

    this.getDataFromAPI();

  }

  getDataFromAPI(){
    this.service.getTest().subscribe((response) => {
      console.log('Response from API is: ' + response);
    }, (error) => {
      console.log('Error: ' + error);
      
    })


  }


}
