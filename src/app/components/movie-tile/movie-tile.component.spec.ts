import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTileComponent } from './movie-tile.component';

describe('MovieTileComponent', () => {
  let component: MovieTileComponent;
  let fixture: ComponentFixture<MovieTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
