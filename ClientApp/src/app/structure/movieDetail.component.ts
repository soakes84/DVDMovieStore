import { Movie } from './../models/movie.model';
import { Repository } from './../models/repository';
import { Component } from '@angular/core';

@Component({
  selector: 'movie-detail',
  templateUrl: 'movieDetail.component.html'
})
export class MovieDetailComponent {
  constructor(private repo: Repository) { }
  get movie(): Movie {
    return this.repo.movie;
  }
}
