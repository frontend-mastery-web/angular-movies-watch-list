import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { WatchListComponent } from './components/watch-list/watch-list.component';

const routes: Routes = [
  { path: '', component: WatchListComponent },
  { path: 'addMovie', component: AddMovieComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
