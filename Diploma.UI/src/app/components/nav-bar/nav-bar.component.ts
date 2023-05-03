import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  userName: string | null;

  constructor(private router: Router, private tokenStorage: TokenStorageService, private dataSharingService: DataSharingService) {
    this.dataSharingService.isUserLoggedIn.subscribe(value => {
      if (value) {
        this.userName = this.tokenStorage.getUsername();
      }
      else {
        this.userName = null;
      }
    })
  }

  moveToLogIn(): void {
    this.router.navigate(['/login'], {});
  }

  moveToSignUp(): void {
    this.router.navigate(['/signup'], {});
  }

  logOut(): void {
    this.tokenStorage.logOut();
    this.dataSharingService.isUserLoggedIn.next(false);
    this.router.navigate([''], {});
  }
}
