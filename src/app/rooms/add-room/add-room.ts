import { Component } from '@angular/core';
import { AddroomsService } from '../../services/addrooms-service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { formatDate, NgIf,  } from '@angular/common';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-add-room',
  imports: [ReactiveFormsModule,  CommonModule],
  templateUrl: './add-room.html',
  styleUrl: './add-room.css',
})

export class AddRoom {

 msg ="";


constructor(private addroomsservice:AddroomsService, private fb:FormBuilder){}

roombooking!: FormGroup;

ngOnInit(){
    this.roombooking = new FormGroup({
    id:new FormControl('',Validators.required),  
    name: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required),
    number: new FormControl('',Validators.required),
    roomtype: new FormControl('',Validators.required),
    checkin: new FormControl('',Validators.required),
    checkout: new FormControl('',Validators.required),
    // profilepic: new FormControl('',Validators.required)
  });


}

rooms: any[] = [];
loading = false;
 
onsubmit(){
  if (this.roombooking.invalid){
          this.msg="Enter All Valid Details Here"
          return  ;
  }
  
const payload = this.roombooking.value; 

      if(this.roombooking.valid){

        this.addroomsservice.bookroom(payload).subscribe({
          
          next:(res:any)=>{

            this.msg="Registration Complete !";
               this.loading = false;
               //console.log("successfull REgistration")
               console.log(payload)
               this.roombooking.reset();
            },

             error:(res:any)=> {
              
              this.msg="unable to submit this request please try after some time";
              this.loading = true;

              }


        })

      }

      else {
         
        this.msg="Please Enter Details Here";

         
      }
      
 }








}

