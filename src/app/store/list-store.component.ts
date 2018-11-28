import { Component, OnInit } from '@angular/core';
import { store } from '../models/store.models';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { NgForm, NgControl } from '@angular/forms';
import { splitAtColon } from '@angular/compiler/src/util';
import { StaticSymbolResolver } from '@angular/compiler';


@Component({
  selector: 'app-list-store',
  templateUrl: './list-store.component.html',
  styleUrls: ['./list-store.component.css']
})
export class ListStoreComponent implements OnInit {
  Flag=0;
  sorting: number;
  searching: string;
  stores: store[] = [];
  arr: number [];
  tempstores: store[] = [];
  num: 0;
  date: Date;
  current_store: store = {
  id: 0,
  name: '',
  description: '',
  price: 0,
  creationDate: this.date,
  thumbnailUrl: '',
  url: ''
  };
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.GetAll();
    this.tempstores = this.stores;
  }

  GetAll(){
    this.http.get<any>('https://msbit-exam-products-store.firebaseio.com/products.json'
    ).subscribe(  result  => {
      for(let i=0;i<result.length;i++){
      this.stores.push(result[i]);
      }
    })
  }

  myclone(store){
    return  Object.assign({}, store);
  }

  SavedData(storeForm: NgForm){
    let Flag=0;
    for(let i=0;i<this.stores.length;i++){
      console.log("this.stores[i].name |"+this.stores[i].name+" $ storeForm.value.name |"+storeForm.value.name);
    if(this.stores[i].id==storeForm.value.id)
    {
      this.stores[i].name=storeForm.value.name;
      this.stores[i].description=storeForm.value.description;
      this.stores[i].price=storeForm.value.price;
      alert("Success, Thank you for updating product: "+this.stores[i].name);
    }
  }
 }

sort(){
  if(this.sorting == 0)
  {
    this.sortbyName();
  }
  if(this.sorting == 1)
  {
    this.sortbyPrice();
  }
  if(this.sorting == 2)
  {
    this.sortbyRecent();
  }
}

sortbyPrice(){
let temp;
for(let i=0;i<this.stores.length;i++)
{
  for(let j=0;j<this.stores.length-1;j++)
  {
    if(this.stores[j].price>this.stores[j+1].price)
    {
     temp = this.stores[j+1];
     this.stores[j+1] = this.stores[j];
     this.stores[j] = temp;
    }
  }     
}
}

sortbyName()
{
    this.stores.sort(function(a,b) {
    var x = a.description.toLowerCase();
    var y = b.description.toLowerCase();
    return x<y?-1:x>y?1:0;
  })
}

sortbyRecent(){
  let temp;
    for(let i=0;i<this.stores.length;i++)
    {
      for(let j=0;j<this.stores.length-1;j++)
      {
       if(this.stores[j+1].id>this.stores[j].id)
        {
         temp = this.stores[j+1];
         this.stores[j+1] = this.stores[j];
         this.stores[j] = temp;
        }
      }     
    }
}

search(){
    for(let i=0;i<this.stores.length;i++){
        if(this.stores[i].description.indexOf(this.searching) == -1)
        {
          this.stores.splice(i,1);
          i--;
        }
      }
    }
}
