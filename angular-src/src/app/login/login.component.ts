import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import {AuthService} from '../service/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   username:String;
   password:String;
  constructor(private router:Router,private _flashMessagesService: FlashMessagesService,private AuthService:AuthService) { }

  ngOnInit() {
  }
  onSubmit(){
    const user={
       username:this.username,
       password:this.password
    }
    // console.log(user);
    this.AuthService.validateUser(user).subscribe(data=>{
      // console.log(data);
      if(data.success){
       this.AuthService.storeUserData(data.token,data.user);
       this._flashMessagesService.show("You are now Logged in",{cssClass:'alert-success',timeout:3000});
       this.router.navigate(['dashboard']);
      }else{
        this._flashMessagesService.show(data.msg,{cssClass:'alert-danger',timeout:3000});
      }
    })

  }

}
