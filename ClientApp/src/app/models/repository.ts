import { Movie } from './movie.model';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Filter } from './configClasses.repository';
import { Studio } from './studio.model';

const studiosUrl = '/api/studios';
const moviesUrl = '/api/movies';

@Injectable()
export class Repository {

movie: Movie;
movies: Movie[];
studios: Studio[] = [];

private filterObject = new Filter();

get filter(): Filter {
    return this.filterObject;
}

constructor(private http: HttpClient) {
  this.filter.related = true;
  this.getMovies();
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

  getStudios() {
    this.http.get<Studio[]>(studiosUrl)
        .subscribe(response => this.studios = response);
  }

  createMovie(mov: Movie) {
    // tslint:disable-next-line:prefer-const
    let data = {
      name: mov.name, category: mov.category,
      description: mov.description, price: mov.price,
      studio: mov.studio ? mov.studio.studioId : 0
    };
    this.http.post<number>(moviesUrl, data)
        .subscribe(response => {
          mov.movieId = response;
          this.movies.push(mov);
        });
  }

  createMovieAndStudio(mov: Movie, stu: Studio) {
    // tslint:disable-next-line:prefer-const
    let data = {
      name: stu.name, city: stu.city, state: stu.state
    };
    this.http.post<number>(studiosUrl, data)
      .subscribe(response => {
        stu.studioId = response;
        mov.studio = stu;
        this.studios.push(stu);
        if (mov != null) {
          this.createMovie(mov);
        }
      });
  }

  replaceMovie(mov: Movie) {
    // tslint:disable-next-line:prefer-const
    let data = {
      name: mov.name, category: mov.category, description: mov.description, price: mov.price, studio: mov.studio ? mov.studio.studioId : 0
    };
    this.http.put(moviesUrl + '/' + mov.movieId, data)
    .subscribe(response => this.getMovies());
  }

  replaceStudio(stu: Studio) {
    // tslint:disable-next-line:prefer-const
    let data = {
      name: stu.name, city: stu.city, state: stu.state
    };
    this.http.put(studiosUrl + '/' + stu.studioId, data)
    .subscribe(response => this.getMovies());
  }
}
