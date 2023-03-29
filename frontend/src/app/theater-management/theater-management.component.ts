import { Component, OnInit } from '@angular/core';
import { Theater } from '../interfaces/theater';
import { TheaterService } from '../services/theaterService';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-theater-management',
  templateUrl: './theater-management.component.html',
  styleUrls: ['./theater-management.component.scss']
})
export class TheaterManagementComponent implements OnInit{
  title = 'Manage theaters'

  theaters!: Theater[];
  theaterForm!: FormGroup;

  constructor(
    private theaterService: TheaterService,
    private formBuilder: FormBuilder) {}

    ngOnInit(): void {
      this.loadTheaters();
      this.createForm();
    }
  
    loadTheaters(): void {
      this.theaterService.getAllTheaters().subscribe(
        theaters => {
          this.theaters = theaters;
        },
        error => {
          console.log('Error loading theaters:', error);
        }
      );
    }
  
    createForm(): void {
      this.theaterForm = this.formBuilder.group({
        name: ['', Validators.required],
        capacity: ['', Validators.required],
        features: ['']
      });
    }
  
    addTheater(): void {
      const featuresArr = this.theaterForm.get('features')?.value;
      const features = Array.isArray(featuresArr) ? featuresArr : [featuresArr];
    
      const newTheater: Theater = {
        id: 0,
        name: this.theaterForm.get('name')?.value,
        capacity: this.theaterForm.get('capacity')?.value,
        features: features
      };
    
      this.theaterService.addTheater(newTheater).subscribe(
        () => {
          this.loadTheaters();
          this.theaterForm.reset();
        },
        error => {
          console.log(error);
        }
      );
    }
  
  }