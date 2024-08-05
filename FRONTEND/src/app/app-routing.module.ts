import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home/home.component';



export const routes: Routes = [
    {path:'register', component:RegisterComponent},
    {path:'login', component:LoginComponent},
    {path:'home', component:HomeComponent},
    {path:'', redirectTo:'/register', pathMatch: 'full'},
];


@NgModule({
    imports:[RouterModule.forRoot(routes),
        CommonModule,
        FormsModule,
        BrowserModule,
       
    ],

    exports:[RouterModule]
})
export class AppRoutingModule { }
