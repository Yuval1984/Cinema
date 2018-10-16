import { Component,OnInit } from '@angular/core';


@Component({
    selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
  })

  export class AlertComponent implements OnInit {
      text='';
      visible = false;

          ngOnInit(){
        }

        show(h){
            this.text = h;
            this.visible = true;
           }

           hide(){
               this.visible = false;
           }
      }


