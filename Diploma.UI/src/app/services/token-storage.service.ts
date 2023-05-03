import { Injectable } from '@angular/core';
import { DataSharingService } from './data-sharing.service';

const TOKEN_KEY = 'AuthToken';
const ID_KEY = "AuthId";
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';
const ROLE_KEY = 'AuthRole';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];

  constructor() { }

  logIn(token: string, id: number, userName: string, role: string) {
    this.saveToken(token);
    this.saveId(id);
    this.saveUsername(userName);
    this.saveRole(role);
  }

  logOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveId(id: number) {
    window.sessionStorage.removeItem(ID_KEY);
    window.sessionStorage.setItem(ID_KEY, id.toString());
  }

  public getId(): number {
    let value = sessionStorage.getItem(ID_KEY);
    if (value) {
      return +value;
    }
    
    return -1;
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string | null {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public saveAuthorities(authorities: string[]) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];
    let authorities = sessionStorage.getItem(AUTHORITIES_KEY);
    if (sessionStorage.getItem(TOKEN_KEY) && authorities) {
      JSON.parse(authorities).forEach((authority: string) => {
        this.roles.push(authority);
      });
    }

    return this.roles;
  }

  public saveRole(role: string) {
    window.sessionStorage.removeItem(ROLE_KEY);
    window.sessionStorage.setItem(ROLE_KEY, role);
  }

  public getRole(): string | null {
    return sessionStorage.getItem(ROLE_KEY);
  }
}
