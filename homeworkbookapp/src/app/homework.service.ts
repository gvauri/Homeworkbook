import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Homework } from './homework';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({ providedIn: 'root' })
export class HomeworkService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { };

  public getHomeworks(): Observable<Homework[]>{
    return this.http.get<Homework[]>(`${this.apiServerUrl}/homework/all`);
    }

    public addHomework(homework: Homework): Observable<Homework>{
      return this.http.post<Homework>(`${this.apiServerUrl}/homework/add`, homework);
      }

    public updateHomework(homework: Homework): Observable<Homework>{
      return this.http.put<Homework>(`${this.apiServerUrl}/homework/update`, homework);
      }

    public deleteHomework(homeworkid: number): Observable<void>{
      return this.http.delete<void>(`${this.apiServerUrl}/homework/delete/${homeworkid}`);
      }

  }

