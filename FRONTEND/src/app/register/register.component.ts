import { Component} from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  name:string = '';
  email:string = '';
  password:string = '';

  constructor(private authService: AuthService, private router:Router){ }

  onRegister(){
    const user = {
      name: this.name,
      email: this.email,
      password: this.password
    };
   
this.authService.register(user).subscribe({
  next: (res) =>{
    console.log("Registered Successfully");
    alert("Registered Successfully");
    this.router.navigate(['/login']);
  },
  error: err=>{
    console.log(err);
    alert("Server Error");
  }
})
  }

  toggleForm(){
    this.router.navigate(['/login']);
  }
}