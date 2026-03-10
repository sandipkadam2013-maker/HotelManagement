import { Component } from '@angular/core';
import { Authservice } from '../../../services/authservice';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [NgIf],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  constructor(private authservice:Authservice){}

  logout(){
    this.authservice.logout();
  }
  
  isLoggedIn(){
    this.authservice.isLoggedIn();
  }


}
