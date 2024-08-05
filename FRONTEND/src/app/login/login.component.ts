import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email:string = '';
  password:string ='';

  constructor(private authService:AuthService, private router: Router){ }

  onLogin(){
    const user = {
      email:this.email,
      password:this.password
    };

    this.authService.login(user).subscribe({
      next:(res) =>{
        console.log("Logged in Successfully");
        alert("Login Successfully");
        this.router.navigate(['/home']);
      },
      error:err=>{
        console.log(err);
        alert("Server Error");
      }
    });
  }

  toggleForm(){
    this.router.navigate(['/register']);
  }
}
