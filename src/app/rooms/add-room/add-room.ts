import { Component,ChangeDetectionStrategy } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddRoom {

 msg ="";


constructor(private addroomsservice:AddroomsService, private fb:FormBuilder){}

roombooking!: FormGroup;

ngOnInit(){
    
    this.roombooking = new FormGroup({
 
    name: new FormControl('',Validators.required),
    roomtype: new FormControl('',Validators.required),
    checkin: new FormControl('',Validators.required),
    checkout: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required)
 
    });


}

rooms:any[] = [];
loading = false;
 

onsubmit() {
  console.log("Form Value:", this.roombooking.value);
  console.log("Form Valid:", this.roombooking.valid);

  const payload = this.roombooking.value;

  if (this.roombooking.valid) {
    this.loading = true;

    this.addroomsservice.bookroom(payload).subscribe({
      next: (res: any) => {
        console.log("API Success:", res);

        this.msg = "Registration Complete!";
        this.loading = false;
        this.roombooking.reset();
      },
      error: (err: any) => {
        console.error("API Error:", err);

        this.msg = "Unable to submit, try later";
        this.loading = false; // ❗ should be false, not true
      }
    });
  }
}








}

