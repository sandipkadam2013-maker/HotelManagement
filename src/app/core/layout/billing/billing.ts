import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoomList } from '../../../services/room-list';
import { NgFor } from '@angular/common';



@Component({
  selector: 'app-billing',
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './billing.html',
  styleUrl: './billing.css',
})

export class Billing implements OnInit{  

  constructor(private fb:FormBuilder, private roomlist:RoomList) {  }  

  roombilling!:FormGroup;
  loading:boolean=false;
  msg="";
  total ="";
 bookings:any[]=[]

 ngOnInit() {

   this.roombilling = this.fb.group({
    id: [''],  
    name: [''],
    address: [''],
    number: [''],
    roomtype: [''],
    checkin: [''],
    checkout: [''],
    ratepernight: [''],
    addcharges: [''],
    nights : [''],
    totalamount: [{ value: '', disabled: true }],

  });

   this.roombilling.valueChanges.subscribe(() => {
    const ratepernight = Number(this.roombilling.get('ratepernight')?.value) || 0;
    const addcharges = Number(this.roombilling.get('addcharges')?.value) || 0;
    const nights = Number(this.roombilling.get('nights')?.value) || 0;
    const totalamount = ratepernight * nights + addcharges;
    this.roombilling.patchValue(
      { totalamount },
      { emitEvent: false}
    );
  });

this.roomlist.getBookings().subscribe({     // 
   next: (res:any) => { 
   this.bookings = res;
  }, 
    error: (err) => { 
        console.error(err);
         this.msg="Fetching latest data...";
     } 
  });






 }

onsubmit(){
  const payload = this.roombilling.getRawValue(); // 👈 important
  this.roomlist.billing(payload).subscribe({
    next:(res:any)=>{
      this.msg="Registration Complete!";
      this.loading = false;
      console.log(payload)
    },
    error:(err:any)=>{
      this.msg="Unable to submit this request. Please try later.";
      this.loading = false;
    }
  });
}


 selectBooking(item: any){
  this.roombilling.patchValue({
    id: item.id,
    name: item.name,
    number: item.number,
    checkin: item.checkin,
    checkout: item.checkout,
    nights: item.nights,
    ratepernight: item.ratepernight
  });
}




}