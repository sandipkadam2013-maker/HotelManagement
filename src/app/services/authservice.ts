import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  constructor(private http:HttpClient, private router:Router){}

     users = [
    { email: 'admin@gmail.com', password: '123', role: 'admin' },
    { email: 'user@gmail.com', password: '123', role: 'user' }
  ];

  login(data: any) {
    const user = this.users.find(
      u => u.email === data.email && u.password === data.password
    );

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }

    return false;
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  getRole() {
    return this.getUser()?.role;
  }

  isLoggedIn() {
    return !!localStorage.getItem('user');
  }

  logout() {
    localStorage.clear();
  }


}
