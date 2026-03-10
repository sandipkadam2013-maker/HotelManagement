import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RoomList } from '../../services/room-list';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clentdetails',
  imports: [ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './clentdetails.html',
  styleUrl: './clentdetails.css',
})
export class Clentdetails {


  roombilling!: FormGroup;

  bookings: any[] = [];
  billing: any[] = [];

  selectedBooking: any;
  selectedInvoice: any;

  billMap: { [key:number]: any } = {};

  loading = false;
  msg = "";
  setflag = "Unpaid";

  constructor(
    private fb: FormBuilder,
    private roomlist: RoomList,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {

    this.initForm();
    this.calculateTotal();

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id){
      this.invoice(id);
    }

    this.loadBookings();
    this.loadBilling();

  }

  // FORM INITIALIZATION
  initForm(){
    this.roombilling = this.fb.group({
      id:[''],
      name:[''],
      address:[''],
      number:[''],
      roomtype:[''],
      checkin:[''],
      checkout:[''],
      ratepernight:[''],
      addcharges:[''],
      nights:[''],
       invoicedate: [''],   // 👈 auto generated date
      totalamount:[{value:'', disabled:true}]
    });
  }

  // TOTAL CALCULATION
  calculateTotal(){
    this.roombilling.valueChanges.subscribe(()=>{
      const rate = Number(this.roombilling.get('ratepernight')?.value) || 0;
      const nights = Number(this.roombilling.get('nights')?.value) || 0;
      const add = Number(this.roombilling.get('addcharges')?.value) || 0;

      const total = rate * nights + add;

        const today = new Date().toISOString().split('T')[0];

this.roombilling.patchValue({
  invoicedate: today
});


      this.roombilling.patchValue(
        { totalamount: total },
        { emitEvent:false }
      );
    });
  }

  // LOAD BOOKINGS
  loadBookings(){
    this.roomlist.getBookings().subscribe({
      next:(res:any)=>{
        this.bookings = res;
      },
      error:()=>{
        this.msg="Error fetching booking data";
      }
    });
  }

  // LOAD BILLING DATA
  loadBilling(){
    this.roomlist.allbilling().subscribe((res:any)=>{
      this.billing = res;

      res.forEach((b:any)=>{
        this.billMap[b.id] = b;
      });
    });
  }

  // SELECT BOOKING
  selectBooking(item:any){
    this.roombilling.patchValue({
      id:item.id,
      name:item.name,
      number:item.number,
      roomtype:item.roomtype,
      address:item.address,
      checkin:item.checkin,
      checkout:item.checkout,
      nights:item.nights,
      ratepernight:item.ratepernight
    });
  }

  // CHECK INVOICE
  invoice(id:number){


    

    const bill = this.billMap[id];
    

    if(bill){
      this.selectedInvoice = bill;
      const total = Number(bill.totalamount);
      this.setflag = total > 0 ? "Paid" : "Unpaid";
       this.msg="Invoce is Generated for This Client";
    }
    else{
      this.setflag = "Unpaid";
      this.msg="No invoice record available";
    }
  }



  // SUBMIT BILL
  onsubmit(){
    
    const payload = this.roombilling.getRawValue();

     payload.invoicedate = new Date().toISOString();

    const duplicate = this.billMap[payload.id];

    if(duplicate){
      alert("Bill already generated for this booking");
      return;
    }

    this.loading = true;

    this.roomlist.billing(payload).subscribe({
      next:()=>{
        this.msg="Payment Successful";
        this.loading=false;
        this.loadBilling(); // refresh billing
      },
      error:()=>{
        this.msg="Unable to process payment";
        this.loading=false;
      }
    });
  }


















//   selectedBooking: any;
//   allbill: any;

//   constructor(private fb:FormBuilder, private roomlist:RoomList, private route: ActivatedRoute, private cd: ChangeDetectorRef) {  }  

//   roombilling!:FormGroup;
//   loading:boolean=false;
//   msg="";
//   total ="";
//  bookings:any[]=[]
//  billing:any[]=[]
//  amount:any;
//  setflag :any;
//  billMap: any = {};
//  data:any;
 

//  ngOnInit() {





//   const id = this.route.snapshot.paramMap.get('id');

//   if (id) {
//     this.invoice(Number(id));
//   }


//    this.roombilling = this.fb.group({
//     id: [''],  
//     name: [''],
//     address: [''],
//     number: [''],
//     roomtype: [''],
//     checkin: [''],
//     checkout: [''],
//     ratepernight: [''],
//     addcharges: [''],
//     nights : [''],
//     totalamount: [{ value: '', disabled: true }],

//   });

//    this.roombilling.valueChanges.subscribe(() => {
//     const ratepernight = Number(this.roombilling.get('ratepernight')?.value) || 0;
//     const addcharges = Number(this.roombilling.get('addcharges')?.value) || 0;
//     const nights = Number(this.roombilling.get('nights')?.value) || 0;
//     const totalamount = ratepernight * nights + addcharges;
//     this.roombilling.patchValue(
//       { totalamount },
//       { emitEvent: false}
//     );
//   });

// this.roomlist.getBookings().subscribe({     // 
//    next: (res:any) => { 
//    this.bookings = res;
//   }, 
//     error: (err) => { 
//         console.error(err);
//          this.msg="Fetching latest data...";
//      } 
//   });

 

//   this.roomlist.allbilling().subscribe((res:any)=>{
//     this.allbill = res;

//     res.forEach((b:any)=>{
//       this.billMap[b.id] = b;
//     });
//   });
//  }



// onsubmit(){
 
//   const payload = this.roombilling.getRawValue(); // 👈 important


//     const duplicate = this.allbill.some(
//     (b:any) => Number(b.id) === Number(payload.id)
//   );




//   if(duplicate){
//     alert("Bill already generated for this booking.");
//     return;
//   }

//   this.roomlist.billing(payload).subscribe({
//     next:(res:any)=>{
//       this.msg="Payment Successful!";
//     },
//     error:(err:any)=>{
//       this.msg="Unable to process payment.";
//     }
//   });

  
//   this.roomlist.billing(payload).subscribe({
//     next:(res:any)=>{
//       this.msg="Registration Complete!";
//       this.loading = false;
//       console.log(payload)
//     },
//     error:(err:any)=>{
//       this.msg="Unable to submit this request. Please try later.";
//       this.loading = false;
//     }
//   });


    


// }



// selectedInvoice: any;

// invoice(id: number) {

//   this.roomlist.allbilling().subscribe({

//     next: (res: any) => {

//       this.billing = res;

//       // Find invoice by id
//       this.selectedInvoice = this.billing.find(
//         (b: any) => Number(b.id) === Number(id)
//       );

//       // Check if invoice exists
//       if (this.selectedInvoice) {

//         const totalAmount = Number(this.selectedInvoice.totalamount);

//         // Set status paid or unpaid
//         this.setflag = totalAmount > 0 ? "Paid" : "Unpaid";
//       } 
//       else {
//         this.msg = "No invoice record available for this ID.";
//         this.setflag = "Unpaid";
//       }

//     },

//     error: (err: any) => {
//       console.log(err);
//       this.msg = "Error while fetching data.";
//     }

//   });

// }





//  selectBooking(item: any){
//   this.roombilling.patchValue({
//     id: item.id,
//     name: item.name,
//     number: item.number,
//     roomtype:item.roomtype,
//     address:item.address,
//     checkin: item.checkin,
//     checkout: item.checkout,
//     nights: item.nights,
//     ratepernight: item.ratepernight,
//     totalamount: item.totalamount,
//   });
// }

// showRowData(item: any) {
//   console.log(item);   // Entire row object
//   this.selectedBooking = item;  // store if needed

//   if(this.selectedInvoice){
//  alert("Duplicate ID not allowed");
//  return;
// }
// }



}
