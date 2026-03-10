import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Billing, Room } from '../core/model/interface-room'


@Injectable({
  providedIn: 'root',
})
export class RoomList{

  constructor(private http: HttpClient) { }

  apiurl = "http://localhost:3000/roomtype";

   

  getroomtype(): Observable<Room[]> {

    return this.http.get<Room[]>(`${'roomtype.json'}`);

  }

  //  All available bookings here we can check booking details

  getBookings(): Observable<Room[]> {

    return this.http.get<Room[]>(`${'http://localhost:3000/bookings'}`);

  }
// get bookings by id

  getBookingById(id: number) {
  return this.http.get(`http://localhost:3000/bookings/${id}`);
} 

// this is for deleting records here.

   deleteBookings(id:number): Observable<Room[]> {
     return this.http.delete<Room[]>(`http://localhost:3000/bookings/${id}`);
  }
// this is for updating records successfully here.

  updateBookings(id: number, data: any){
  return this.http.put(`http://localhost:3000/bookings/${id}`, data);
  }
 
  // thiis is for save billing record here....

   urlbil ="http://localhost:3000/billing";

  billing(data:any):Observable<any> {
         return this.http.post((this.urlbil), data) 
   }

 allbilling():Observable<any> {
         return this.http.get((this.urlbil)) 
   }



}
