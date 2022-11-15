import { Component, OnInit } from '@angular/core';
import { Movies } from 'src/app/movies';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss']
})
export class WatchListComponent implements OnInit {
  movies: Movies[] = [];
  yetToWatchMovies: Movies[] = [];
  watchedMovies: Movies[] = [];

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe((movies) => this.movies = movies);
  }

  ngDoCheck(): void {
    if (this.movies.length && !this.watchedMovies.length) {
      this.yetToWatchMovies = this.movies.filter((m) => !m.isFav && !m.isWatched);
      this.watchedMovies = this.movies.filter((m) => m.isWatched);
    }
  }

  onFavClick(movie: Movies): void {
    this.moviesService.updateMovie({ ...movie, isFav: !movie.isFav, isWatched: movie.isFav ? true : movie.isWatched }).subscribe((updatedMovie) => {
      if (updatedMovie.isWatched) {
        const alreadyWatched = this.watchedMovies.find(movie => movie.id === updatedMovie.id);
        if (alreadyWatched) {
          alreadyWatched.isFav = updatedMovie.isFav
          this.watchedMovies = this.watchedMovies.map((m) => {
            if (m.id === updatedMovie.id) {
              return updatedMovie;
            }
            return m;
          })
        } else {
          this.watchedMovies.push(updatedMovie);
        }
        this.yetToWatchMovies = this.yetToWatchMovies.filter((m) => m.id !== updatedMovie.id);
      }
      else {
        this.watchedMovies = this.watchedMovies.filter((m) => m.id !== updatedMovie.id);
        this.yetToWatchMovies.push(updatedMovie);
      }
    });
  }

  onWatchedClick(movie: Movies): void {
    const payloadMovie = { ...movie, isWatched: !movie.isWatched };
    payloadMovie.isFav = payloadMovie.isWatched ? payloadMovie.isFav : false;
    this.moviesService.updateMovie(payloadMovie).subscribe((updatedMovie) => {
      if (updatedMovie.isWatched) {
        this.watchedMovies.push(updatedMovie);
        this.yetToWatchMovies = this.yetToWatchMovies.filter((m) => m.id !== updatedMovie.id)
      } else {
        this.watchedMovies = this.watchedMovies.filter((m) => m.id !== updatedMovie.id);
        this.yetToWatchMovies.push(updatedMovie);
      }
    });
  }

}
