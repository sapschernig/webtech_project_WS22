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
  selectedTheater: Theater | undefined;
  isEditMode = false;

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
        id: [0],
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
  
    editTheater(theater: Theater): void {
      this.isEditMode = true;
      this.theaterForm.setValue({
        id: theater.id,
        name: theater.name,
        capacity: theater.capacity,
        features: theater.features
      });
    }
    
    cancelEditMode() {
      this.isEditMode = false;
      this.theaterForm.reset();
    }
  
    updateTheater(): void {
      const updatedTheater: Theater = {
        id: this.theaterForm.get('id')?.value,
        name: this.theaterForm.get('name')?.value,
        capacity: this.theaterForm.get('capacity')?.value,
        features: this.theaterForm.get('features')?.value
      };
  
      this.theaterService.updateTheater(updatedTheater).subscribe(
        () => {
          this.loadTheaters();
          this.theaterForm.reset();
        },
        error => {
          console.log(error);
        }
      );
    }
  
    deleteTheater(theater: Theater): void {
      if (confirm('Are you sure you want to delete this theater?')) {
        this.theaterService.deleteTheater(theater.id).subscribe(
          () => {
            this.loadTheaters();
          },
          error => {
            console.log(error);
          }
        );
      }
    }
    
  }