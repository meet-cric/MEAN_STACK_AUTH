import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import {AuthService} from '../service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:object;
  constructor(private router:Router,private AuthService:AuthService,private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.AuthService.getProfile().subscribe(profile=>{
      this.user=profile.user
    },
    err=>{
      console.log(err);
      return false;
    }
  
  )
  }

}
