import { Component } from '@angular/core';
import { ɵInternalFormsSharedModule, ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { Authservice } from '../../../services/authservice';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
 loginform!: FormGroup;

constructor(private fb:FormBuilder, private router: Router, private authservice:Authservice){ }

 ngOnInit() {
    this.loginform = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]

    });

    this.login();
  }
   

login() {
  const success = this.authservice.login(this.loginform.value);

  if (success) {
    const role = this.authservice.getRole();

    if (role === 'admin') {
      this.router.navigate(['/roomDetails']);
    } else {
      this.router.navigate(['/roomDetails']);
    }

  } else {
    alert('Invalid credentials');
  }
}

    logout(){
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    this.router.navigate(['/login']);
  }



}



