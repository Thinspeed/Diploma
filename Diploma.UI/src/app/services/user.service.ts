import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private route = "user"

  constructor(private http: HttpClient) { }

  public getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/${this.route}/getById?id=${id}`);
  }
}
