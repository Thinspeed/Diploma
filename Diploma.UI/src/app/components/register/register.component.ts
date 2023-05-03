import { Component, OnInit } from '@angular/core';
import { Form, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  firstNameControl: FormControl;
  lastNameControl: FormControl;
  emailControl: FormControl;
  passwordControl: FormControl;
  passwordConfirmControl: FormControl;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.firstNameControl = new FormControl();
    this.lastNameControl = new FormControl();
    this.emailControl = new FormControl();
    this.passwordControl = new FormControl();
    this.passwordConfirmControl = new FormControl();
  }

  signUp(): void {
    if (this.passwordControl.value != this.passwordConfirmControl.value) {
      return;
    }

    let user = new User();
    user.firstName = this.firstNameControl.value;
    user.lastName = this.lastNameControl.value;
    user.email = this.emailControl.value;
    user.password = this.passwordControl.value;
    this.authService.register(user).subscribe(u => {
      this.authService.login(u).subscribe(() => this.router.navigate([''], {}));
    });
  }
}
