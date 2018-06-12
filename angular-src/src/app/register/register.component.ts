import { Component, OnInit } from '@angular/core';
import {RegisterService} from '../service/register/register.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {AuthService} from '../service/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  name:String;
  username:string;
  password:string;
  email:string;

  constructor(private router:Router,private AuthService:AuthService,private RegisterService:RegisterService,private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    // this._flashMessagesService.show('We are in about component!', { cssClass: 'alert-success', timeout: 1000 });
  }
  onRegisterSubmit(){
    const user={
      name:this.name,
      email:this.email,
      username:this.username,
      password:this.password
    }
    // console.log(user);
  
  if(!this.RegisterService.validateRegister(user)){
    this._flashMessagesService.show("please fill in all fields",{cssClass:'alert-danger',timeout:3000});
   
  }
  if(!this.RegisterService.validateEmail(user.email)){
    this._flashMessagesService.show("please use a valid email",{cssClass:'alert-danger',timeout:3000});
  }
      // Register user
      this.AuthService.registerUser(user).subscribe(data => {
        if(data.success) {
          this._flashMessagesService.show('You are now registered and can now login', {cssClass: 'alert-success', timeout: 3000});
          this.router.navigate(['/login']);
        } else {
          this._flashMessagesService.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
          this.router.navigate(['/register']);
        }
      }); 
  }

}
