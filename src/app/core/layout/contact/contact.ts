import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Contactform } from '../../../services/contactform';



@Component({
  selector: 'app-contact',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit{

contactdetail!:FormGroup
   
constructor(private fb:FormBuilder, private contactform:Contactform){}

  ngOnInit(){
 

 this.contactdetail = this.fb.group({

  fullname: ["", Validators.required],
  email: ["", [Validators.required, Validators.email]],
  message: ["", Validators.required]

  });


 }

   submit() {
    
 console.log(this.contactdetail.value);
console.log(this.contactdetail.valid);
console.log(this.contactdetail.controls);

    if(this.contactdetail.valid){
      const payload = this.contactdetail.value;
      this.contactform.addcontact(payload).subscribe({
          next:(res:any)=> {
             alert("form submitted");
          }
        })
        }
        else{
            alert("please enter valid Details");
        }
   }

}
