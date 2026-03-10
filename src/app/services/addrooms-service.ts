import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AddroomsService {

  constructor(private http:HttpClient){}
  
  urllink = 'http://localhost:3000/bookings';

     bookroom(data: any): Observable<any>{
      // return this.http.post(("addroom.json"), data);
      return this.http.post((this.urllink), data)
  }

    
  //   bookroom(data: any) {
  //   return this.http.post('http://localhost:3000/bookings', data).pipe(
  //     tap((res: any) => {
  //       console.log('✅ Data inserted successfully', res);
  //     }),
  //     catchError(err => {
  //       console.error('❌ Insert failed', err);
  //       return of(err);
  //     })
  //   );
  // }

  
}
