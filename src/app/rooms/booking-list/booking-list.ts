import { Component, OnInit } from '@angular/core';
import { RoomList } from '../../services/room-list';
import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BannerSlider } from "../../core/layout/banner-slider/banner-slider";
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-booking-list',
  imports: [NgFor, CommonModule, BannerSlider,NgIf],
  templateUrl: './booking-list.html',
  styleUrl: './booking-list.css',
})
export class BookingList implements OnInit{

  tittle="Booking Details"
  constructor(private roomlist:RoomList, private cd:ChangeDetectorRef, private router: Router){}

  editBooking(id: number){
  this.router.navigate(['bookings/edit', id]);
}

ngOnInit(): void {
   this.allbooking();
   this.cd.detectChanges();
}
  bookings:any [] = [];
  loading = false;
  close= false;
   msg ="";

  confirmation: boolean = false;

 allbooking():void{             
  console.log("Fetching latest data...");

    this.roomlist.getBookings().subscribe ({  

        next: (res:any) => { 

        this.bookings = res
        console.log(this.bookings);
        this.loading = false; // hide loader
        this.cd.detectChanges()
       }, 
   
       error: (err) => { 
        console.error(err);
         this.msg="Fetching latest data...";
         this.loading = true;
       } 
  
       });

  }

confirm(){
         this.allbooking();
     }
    selectedBookingId!: number;
    openModal(id: number) {
     this.selectedBookingId = id;
   
  }

bookingdelete(id: number) { 
         this.roomlist.deleteBookings(id).subscribe({
      next: () => {
            console.log('Deleted successfully');
            this.bookings = this.bookings.filter(b => b.id !== id);
        },
      error: (err) => {
         console.error('Delete failed', err);
         this.msg ="Unable to Delete this record";
         alert("Unable TO Delete");
     }

   });
  
 

 }









}
