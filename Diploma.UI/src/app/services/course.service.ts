import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Course } from '../models/course';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private route = 'courses';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Course[]> {
    return this.http.get<Course[]>(`${environment.apiUrl}/${this.route}/getAll`);
  }

  add(course: Course): Observable<number> {
    return this.http.post<number>(`${environment.apiUrl}/${this.route}/add`, course);
  }

  getById(id: number): Observable<Course> {
    return this.http.get<Course>(`${environment.apiUrl}/${this.route}/getById?id=${id}`);
  }

  getByTeacherId(id: number): Observable<Course[]>  {
    return this.http.get<Course[]>(`${environment.apiUrl}/${this.route}/getByTeacherId?id=${id}`);
  }

  getByStudentId(id: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${environment.apiUrl}/${this.route}/getByStudentId?id=${id}`);
  }
}
