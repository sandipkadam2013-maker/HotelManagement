import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Contactform {

  constructor(private http:HttpClient){ }
    private url="http://localhost:3000/contact";
      addcontact(data:any):Observable<any>{
            return this.http.post('http://localhost:3000/contact',data);
      }

  
}
