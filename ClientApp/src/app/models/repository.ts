import { Movie } from './movie.model';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Filter } from './configClasses.repository';

const moviesUrl = '/api/movies';
@Injectable()
export class Repository {

movie: Movie;
movies: Movie[];

private filterObject = new Filter();

get filter(): Filter {
    return this.filterObject;
}

constructor(private http: HttpClient) {
  this.filter.category = 'drama';
  this.filter.related = true;
  this.getMovies(true);
  }

  getMovie(id: number) {
     this.http.get(moviesUrl + '/' + id).subscribe(response => { this.movie = response; });
  }

  getMovies(related = false) {
    let url = moviesUrl + 'related=' + this.filter.related;
    if (this.filter.category) {
      url += '&category=' + this.filter.category;
    }
    if (this.filter.search) {
      url += '&search=' + this.filter.search;
    }
    this.http.get<Movie[]>(url)
    .subscribe(response => this.movies = response);
  }
}
