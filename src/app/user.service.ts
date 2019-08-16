import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

// 3. Create a JSON header to be attached to outbound post requests
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  private url:string 
  private getUsersUrl:string
 

  constructor(private http: HttpClient) {
    let l = window.location;
    let host:string;
    
    if(l.port == '8100'){
      host = 'localhost:3000';
    }else{
      host = l.hostname + ((l.port.length>0)?':' + l.port:'');
    }
   // console.log('    - host in UserService');
   // console.log(host);
    this.url = `${l.protocol}//${host}/api/auth/`;
    this.getUsersUrl=`${l.protocol}//${host}/api/users`;
  //  console.log('    - this.url in UserService');
  //  console.log(this.url);
  //  console.log('');
  // alert('hold in constructor');
  }

  registerUser(user: User): Observable<User>{
    return this.http.post<User>(this.getUsersUrl , user, httpOptions);
  }




  logIn(user: User): Observable<User>{
    return this.http.post<User>(this.url + 'login', user, httpOptions);
  }

  getUsersArray(): Observable<User[]> {
    console.log(' - - in getUsersArray')
    console.log(this.getUsersUrl)
    return this.http.get<User[]>(this.getUsersUrl)
  }
  getUserById(id: string): Observable<User> {
   console.log('in service getUserById');
   console.log(`${this.getUsersUrl}/${id}` )
   return this.http.get<User>(`${this.getUsersUrl}/${id}` )
 }


} // end class UserService