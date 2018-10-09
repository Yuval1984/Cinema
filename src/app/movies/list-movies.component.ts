import { Component, OnInit } from '@angular/core';
import { movie } from '../models/movie.model';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

import * as jQuery from 'jquery';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css']
})
export class ListMoviesComponent implements OnInit {
  movies: movie[] = [];
  id: 0;
  current_movie: movie = {
    id: this.id+1,
    Title: '',
    Year: '',
    Runtime: '',
    Genre: '',
    Director: '',
    Poster: ''
  };

  constructor(private http: HttpClient) 
  {
  }
 
  ngOnInit(){
    this.GetMovieData()
  }
  OnEdit(){
  }

  myclone(movie){
    return  Object.assign({}, movie);
  }

  saveEmployee(movieForm: NgForm): void {
    for(let i = 0; i < this.movies.length; i++ )
      if( this.movies[i].Title == this.current_movie.Title )
      {
        this.movies[i] = this.myclone(this.current_movie);
        break;
      }
  }

  deleteMovie(DeleteForm: NgForm): void {
    for(let i = 0; i < this.movies.length; i++ )
      if( this.movies[i].Title == this.current_movie.Title )
      {
        this.movies.splice(i,1);
        break;
      }
    }

    GetMovieData(){
      let i = 0;
      let moviearr =[
        "The Predator&2018","Ant-Man and the Wasp&2018","ready player one&2018", "Justice League&2017"
      ]
      for(let i=0;i<moviearr.length;i++)
      {
      this.http.get<any>('http://www.omdbapi.com/?t=' + moviearr[i] +"&apikey=4c039a0f"
      ).subscribe(  result  => {
        this.movies.push(result);
      })
    }
    }

    GetMovieData2(T,Y){
      this.http.get<any>('http://www.omdbapi.com/?t='+T+"&y="+Y+"&apikey=4c039a0f"
      ).subscribe(  result  => {
        this.movies.push(result);
      })

    }
    AddNewMovie(movieForm: NgForm): void {
      let Flag=0;
      for(let i=0;i<this.movies.length;i++)
      {
        if( this.movies[i].Title == movieForm.value.Title )
        {
          console.log(this.movies[i].Title,movieForm.value.Title)
          Flag=1;
        }   
      }
      if(Flag==0)
        this.GetMovieData2(movieForm.value.Title,movieForm.value.Year);
    }
}
