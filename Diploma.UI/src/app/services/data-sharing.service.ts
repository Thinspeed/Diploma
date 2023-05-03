import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  public isUserLoggedIn: BehaviorSubject<boolean>;

  constructor(private tokenStorage: TokenStorageService) {
    if (tokenStorage.getToken()) {
      this.isUserLoggedIn = new BehaviorSubject<boolean>(true);
    }
    else {
      this.isUserLoggedIn = new BehaviorSubject<boolean>(false);
    }
  }
}
