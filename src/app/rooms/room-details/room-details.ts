import { Component, OnInit } from '@angular/core';
import { RoomList } from '../../services/room-list';
import { HttpClient } from '@angular/common/http';
import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [NgFor, CommonModule,],
  templateUrl: './room-details.html',
  styleUrl: './room-details.css',
})
export class RoomDetails implements OnInit 
{
  rooms: any;
 constructor( private http:HttpClient, private route:Router, private roomlist:RoomList, private cd: ChangeDetectorRef){}

ngOnInit(){

    this.RoomTypes();
    this.cd.detectChanges(); 

}

 RoomTypes():void{ 
                          
    this.roomlist.getroomtype().subscribe({  

       next: (res:any) => { this.rooms = res;


        this.cd.detectChanges()
       }, 
   
       

       error: (err) => { console.error(err);} 
      

       });

  }


booknow(){
  this.route.navigate(['addrooms']);
}
 

}
