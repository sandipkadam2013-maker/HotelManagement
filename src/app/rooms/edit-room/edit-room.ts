import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RoomList } from '../../services/room-list';
import { NgIf, NgForOf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-room',
  imports: [ReactiveFormsModule, FormsModule, NgIf, NgForOf],
  templateUrl: './edit-room.html',
  styleUrl: './edit-room.css',
})
export class EditRoom implements OnInit {

 bookings:any [] = [];
 selectedBooking: any;

 constructor(
  private roomlist:RoomList, 
  private cd:ChangeDetectorRef, 
  private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ){}

 
  bookingForm!: FormGroup;
  bookingId!: number;
  successMsg = '';
  errormsg = '';
 
  ngOnInit() {

    this.bookingForm = this.fb.group({

      name: [''],
      roomtype: [''],
      number: [''],
      address: [''],
      id:[''],

    });

    // Get ID from URL
    this.bookingId = Number(this.route.snapshot.paramMap.get('id'));
    this.updateBooking();
    this.bookingForm.disable();

  }

  updateBooking() {
  // ✅ FETCH DATA FROM DB
  
  this.roomlist.getBookingById(this.bookingId)
    .subscribe({

      next: (data: any) =>{
        console.log("Booking Data:", data);
        this.bookingForm.patchValue(data);   // ✅ Fill form
      },

      error: (err) => {
        console.error("Error loading booking", err);
        alert("Getting Error Whicle Getting Bookings");
        this.errormsg="Unable To Fetch Data, While loading this record ...";
      }

    });
      

}
   
cancelEdit() {

this.router.navigate(['/bookingList']);


}


   enableedit(){
         this.bookingForm.enable();
    }

    
  onSubmit() {

    if (this.bookingForm.valid){

      this.roomlist.updateBookings(
        this.bookingId,
        this.bookingForm.value
      ).subscribe({

        next: () => {

          // Navigate back with success flag
          this.router.navigate(['/bookingList'], {
            
          });

    this.successMsg="Data Inserted Successfully";

        },

        error: (err) => {
          console.error(err);
        }

      });
    }
  }



}
