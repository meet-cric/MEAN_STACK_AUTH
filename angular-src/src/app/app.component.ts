import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import {AuthService} from './service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private router:Router,private _flashMessagesService: FlashMessagesService,private AuthService:AuthService)
  {}
  onLogoutClick(){
    this.AuthService.onlogout();
    this._flashMessagesService.show("You are succesfully loged out",{cssClass:'alert-success',timeout:3000});
    this.router.navigate(['login']);
  }
}
