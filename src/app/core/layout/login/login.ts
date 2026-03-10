import { Component } from '@angular/core';
import { ɵInternalFormsSharedModule, ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
 loginform!: FormGroup;


constructor(private fb:FormBuilder, private router: Router){ }

 ngOnInit() {

    this.loginform = this.fb.group({
      
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]

    });

    this.login();
  }
   
 login(){


   const email = this.loginform.value.email;
    const password = this.loginform.value.password;
  

   if (email === 'admin' && password === 'admin123') {


      // ✅ Navigate to dashboard
      this.router.navigate(['/roomDetails']);
    } 
    
    else {
      alert('Invalid credentials');
    }

 
 }

 logout(){
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    this.router.navigate(['/login']);
  }



}
