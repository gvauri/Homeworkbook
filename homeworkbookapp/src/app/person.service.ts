import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from './person';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({ providedIn: 'root' })
export class Personservice {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { };

    public getPersonByUsernameAndPassword(username: string, password: string): Observable<Person>{
      return this.http.get<Person>(`${this.apiServerUrl}/person/findLogin/${password}/${username}`);
    }
    public addPerson(person: Person): Observable<Person>{
      return this.http.post<Person>(`${this.apiServerUrl}/person/add`, person);
    }
    public updateHomework(person: Person): Observable<Person>{
      return this.http.put<Person>(`${this.apiServerUrl}/person/update`, person);
    }

  }

