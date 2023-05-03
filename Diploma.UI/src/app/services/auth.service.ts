import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { DataSharingService } from './data-sharing.service';

const ID_CLAIM_KEY = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
const NAME_CLAIM_KEY = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";
const EMAIL_CLAIM_KEY = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";
const ROLE_CLAIM_KEY = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private route = "auth"
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService, private dataSharingService: DataSharingService) { }

  public register(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/${this.route}/register`, user);
  }

  public login(user: User): Observable<string> {
    let res = this.http.post(`${environment.apiUrl}/${this.route}/login`, user, { responseType: 'text' });
    res.subscribe((token: string) => {
      let decodedJWT = JSON.parse(window.atob(token.split('.')[1]));
      this.tokenStorage.logIn(token.substring(1, token.length - 1), decodedJWT[ID_CLAIM_KEY], decodedJWT[NAME_CLAIM_KEY], decodedJWT[ROLE_CLAIM_KEY]);
      this.dataSharingService.isUserLoggedIn.next(true);
    });

    return res;
  }
}
