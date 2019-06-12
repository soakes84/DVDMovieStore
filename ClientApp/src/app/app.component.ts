import { Movie } from './models/movie.model';
import { Repository } from './models/repository';
import { Component } from '@angular/core';

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

}
