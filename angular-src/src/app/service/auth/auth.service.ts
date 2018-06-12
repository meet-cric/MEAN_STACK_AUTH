import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpModule } from '@angular/http';
import { map } from 'rxjs/operators';
import { pipe } from '@angular/core/src/render3/pipe';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user:any;
  authToken:any;
  constructor(private http:Http) { }
  registerUser(user){
    let headers=new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:8000/users/register',user,{headers:headers})
    .pipe(map(res => res.json()));
  }
}
