import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpModule } from '@angular/http';
import { map } from 'rxjs/operators';
import { tokenNotExpired } from 'angular2-jwt';
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
  validateUser(user){
    let headers=new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:8000/users/authenticate',user,{headers:headers})
    .pipe(map(res => res.json()));
  }
  loadToken(){
    const token=localStorage.getItem('id_token');
    this.authToken=token;
  }
  getProfile(){
    let headers=new Headers();
    headers.append('Authorization',this.authToken);
    headers.append('Content-type','application/json');
    return this.http.get('http://localhost:8000/users/profile',{headers:headers})
    .pipe(map(res => res.json()));
  }
  storeUserData(token,user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken=token;
    this.user=user;
  }
  onlogout(){
    this.authToken=null;
    this.user=null;
    localStorage.clear();

  }
  loggedIn() {
    return tokenNotExpired();
  }
}
