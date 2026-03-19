import { Component } from '@angular/core';
import { Authservice } from '../../../services/authservice';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [NgIf, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

 login(){
       return this.router.navigate(['login']);
 }

  constructor(public auth: Authservice, private router:Router){}



  logout(){
    this.auth.logout();
  }
  
  isLoggedIn(){
    this.auth.isLoggedIn();
  }

   menuOpen = false;

  toggleMenu(){
    this.menuOpen = !this.menuOpen;
  }

}
