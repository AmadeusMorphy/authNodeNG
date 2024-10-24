import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'https://api.mrnzd.com/api/v1';

  constructor(
    private http: HttpClient
  ) { }


  ngOnInit(): void {

  }

  getData(key: string) {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get(`${environment.apiUrl}/users/key?key=${key}`, { headers })
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${environment.apiUrl}/users/login`, { email, password })
  }

  signUp(name: string, email: string, password: string, age: number, dateCreated: Date): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users`, { name, email, password, age, dateCreated })
  }

  checkUserLoggedIn(): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/users/validate-token`, { headers });
  }
}
