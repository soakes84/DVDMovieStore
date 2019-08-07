import { Movie } from './models/movie.model';
import { Repository } from './models/repository';
import { Component } from '@angular/core';
import { Studio } from './models/studio.model';
import { stringify } from 'querystring';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Web Development with ASP.NET Core and Angular';
  constructor(private repo: Repository) {}

  get movie(): Movie {
    return this.repo.movie;
  }

  get movies(): Movie[] {
    return this.repo.movies;
  }

  createMovie() {
    this.repo.createMovie(new Movie(0, 'X-Men Final Chapter',
    'Drama', 'After the re-emergence of the world\'s first mutant, ' +
    'the world-destroyer Apocalypse, the X-Men must unite to defeat his ' +
    'extinction level plan.', 49.99, this.repo.movies[0].studio));
  }
  createMovieAndStudio() {
    // tslint:disable-next-line:prefer-const
    let s = new Studio(0, 'SkyTaylor Films', 'Brooklyn', 'NY');
    // tslint:disable-next-line:prefer-const
    let m = new Movie(0, 'Chef', 'Romance',
      'A head chef quits his restaurant job and buys a food truck', 100, s);
    this.repo.createMovieAndStudio(m, s);
  }

  replaceMovie() {
    // tslint:disable-next-line:prefer-const
    let m = this.repo.movies[0];
    m.name = 'Modified Movie';
    m.category = 'Modified Category';
    this.repo.replaceMovie(m);
  }
  replaceStudio() {
    // tslint:disable-next-line:prefer-const
    let s = new Studio(3, 'Modified Studio', 'New York', 'NY');
    this.repo.replaceStudio(s);
  }

  updateMovie() {
    // tslint:disable-next-line:prefer-const
    let changes = new Map<string, any>();
    changes.set('name', 'Last Dance');
    changes.set('studio', null);
    this.repo.updateMovie(1, changes);
  }

  deleteMovie() {
    this.repo.deleteMovie(1);
  }
  deleteStudio() {
    this.repo.deleteStudio(2);
  }

}
