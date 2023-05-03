import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../models/user';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailControl: FormControl;
  passwordControl: FormControl;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
    private dataSharingService: DataSharingService, private router: Router) { }

  ngOnInit() : void {
    this.emailControl = new FormControl();
    this.emailControl.setValue('offmailno5@gmail.com');
    this.passwordControl = new FormControl();
    this.passwordControl.setValue('Ez4ence_no');
  }

  logIn() : void {
    let user = new User();
    user.email = this.emailControl.value;
    user.password = this.passwordControl.value; 
    this.authService.login(user).subscribe(() => this.router.navigate([''], {}));
  }
}
