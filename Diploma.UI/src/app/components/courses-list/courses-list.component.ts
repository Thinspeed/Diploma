import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validator, Validators } from '@angular/forms';
import { Course } from 'src/app/models/course';
import { User } from 'src/app/models/user';
import { CourseService } from 'src/app/services/course.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  courses: Course[] = [];
  role: string | null;
  displayingUser: User;
  file: any;

  nameControl: FormControl;
  descriptionControl: FormControl;

  @ViewChild('closeModal') closeModal: ElementRef;
  @Input('user-id') displayingUserId?: number;

  constructor(private courseService: CourseService, private tokeStorage: TokenStorageService, private userService: UserService) { }

  ngOnInit() {
    this.role = this.tokeStorage.getRole();
    if (this.displayingUserId) {
      this.userService.getUserById(this.displayingUserId).subscribe((result: User) => {
        this.displayingUser = result;
        this.getCourses(this.displayingUserId);
      })
    }
    else {
      this.getCourses();
    }

    this.nameControl = new FormControl('', [Validators.required, Validators.maxLength(50)]);
    this.descriptionControl = new FormControl('', [Validators.required, Validators.maxLength(1000)]);
  }

  getCourses(id?: number) {
    if (id && this.displayingUser.role == "Teacher") {
      this.courseService.getByTeacherId(id).subscribe((result: Course[]) => (this.courses = result));
    }
    else if (id && this.displayingUser.role == "User") {
      this.courseService.getByStudentId(id).subscribe((result: Course[]) => (this.courses = result));
    }
    else {
      this.courseService.getAll().subscribe((result: Course[]) => (this.courses = result));
    }
  }
  
  getFile(event: any) {
    this.file = event.target.files[0];
  }

  addCourse() {
    let formData = new FormData();
    formData.append('file', this.file, this.file.name);
    //файл нужно загужать отдельно и потом просто ипользовать полученный от сервара путь

    let course = new Course({ name: this.nameControl.value, description: this.descriptionControl.value, teacherId: this.tokeStorage.getId() });
    this.courseService.add(course).subscribe(result => {
      this.closeModal.nativeElement.click();
      this.getCourses();
    });
  }
}
