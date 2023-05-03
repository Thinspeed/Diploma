import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {
  userId: number;
  constructor(private tokenStorage: TokenStorageService) {}

  ngOnInit() {
    this.userId = this.tokenStorage.getId();
  }
}
