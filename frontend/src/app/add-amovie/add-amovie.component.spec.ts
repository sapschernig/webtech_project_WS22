import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAMovieComponent } from './add-amovie.component';

describe('AddAMovieComponent', () => {
  let component: AddAMovieComponent;
  let fixture: ComponentFixture<AddAMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAMovieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
