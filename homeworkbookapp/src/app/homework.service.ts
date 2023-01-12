import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Homework } from './homework';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { LoginService } from './login.service';
@Injectable({ providedIn: 'root' })
export class HomeworkService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private loginService: LoginService) { };

    public getHomeworksbyUserID(): Observable<Homework[]>{
      return this.http.get<Homework[]>(`${this.apiServerUrl}/homework/findUser/${this.loginService.userID}`);
      }

    public addHomework(homework: Homework): Observable<Homework>{
      return this.http.post<Homework>(`${this.apiServerUrl}/homework/add`, homework);
      }

    public updateHomework(homework: Homework): Observable<Homework>{
      return this.http.put<Homework>(`${this.apiServerUrl}/homework/update`, homework);
      }

    public getHomeworkByID(homeworkID: number): Observable<Homework>{
      return this.http.get<Homework>(`${this.apiServerUrl}/homework/find/${homeworkID}`);
    }

  }

