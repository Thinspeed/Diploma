import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { CourseComponent } from './components/course/course.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'courses', component: CoursesListComponent },
  { path: 'myCourses', component: MyCoursesComponent },
  { path: 'course/:id', component: CourseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
