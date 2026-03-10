import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  constructor(private http:HttpClient, private router:Router){}

  login(email: string) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    this.router.navigate(['/login']);

  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }


}
