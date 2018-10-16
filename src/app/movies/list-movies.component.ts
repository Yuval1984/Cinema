import { Component, OnInit, ViewChild} from '@angular/core';
import { movie } from '../models/movie.model';
import { NgForm, NgControl } from '@angular/forms';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import * as jQuery from 'jquery';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { open } from 'fs';
import { AlertComponent } from './alert.component';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css'],
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

  @ViewChild(AlertComponent)
    private modal : AlertComponent;

  myclone(movie){
    return  Object.assign({}, movie);
  }



  saveEmployee(movieForm: NgForm): void {
    let a=1000 as any;
    let b=2018 as any;
    let y="Input for Year has wrong value";
    let g="Input for Genre has wrong value";
    let r="Input for Runtime has wrong value";
    let d="Input for Director has wrong value";
    let stringarr = "Wrong Input in " as any;
    let pattern = new RegExp("[^0-9]") as any;
    
    if(this.current_movie.Year < a || this.current_movie.Year > b || this.current_movie.Year == "" || pattern.test(this.current_movie.Year))
        stringarr=stringarr+",Year ";
    if(this.current_movie.Genre == "")
        stringarr=stringarr+",Genre ";
    if(this.current_movie.Runtime == "")
        stringarr=stringarr+",Runtime ";
    if(this.current_movie.Director == "")
        stringarr=stringarr+",Director ";
    if(stringarr != "Wrong Input in ")
        this.modal.show(stringarr);

    else{
    for(let i = 0; i < this.movies.length; i++ )
      if( this.movies[i].Title == this.current_movie.Title )
      {
        this.movies[i] = this.myclone(this.current_movie);
        break;
      }
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
      this.http.get<any>('https://www.omdbapi.com/?t=' + moviearr[i] +"&apikey=4c039a0f"
      ).subscribe(  result  => {
        this.movies.push(result);
      })
    }
    }
    
    GetMovieData2(T,Y){
      this.http.get<any>('https://www.omdbapi.com/?t='+T+"&y="+Y+"&apikey=4c039a0f"
      ).subscribe(  result  => {
        let s="Same movie already exists, Movie wasnt added to list";
        let t="Movie wasnt found try searching again";
        let Flag=0;
        if(result.Response!="False")
        {
          for(let i=0;i<this.movies.length;i++)
          {
            console.log("FLag = "+Flag+" | movies["+i+"] = "+this.movies[i].Title+" || result.Title = "+result.Title)
            if( this.movies[i].Title == result.Title )
            {
              Flag=1;
              console.log("Same Title , Flage = "+Flag);
            }
          }
          if(Flag==0)
            this.movies.push(result);
            else{
            this.modal.show(s);
            }
        }
        else
        {
        this.modal.show(t);
        }
      })
      
    }
    AddNewMovie(movieForm: NgForm) {
        this.GetMovieData2(movieForm.value.Title,movieForm.value.Year);
    }
}