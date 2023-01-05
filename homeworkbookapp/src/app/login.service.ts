import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from './person';
import { Personservice } from './person.service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public registrierenClass = "invisible";
  public registrierenLinkClass = "registrierenLink";
  public titelLogin = "Login";
  constructor(private personservice: Personservice) { }
  public person?: Person;
  public isLogedIn: boolean = false;
  public registrieren: boolean = false;
  
  public changeRegister(){
    this.titelLogin = "Registrieren";
    this.registrieren = true;
    this.registrierenClass = ""
    this.registrierenLinkClass = "invisible"
  }
  public login(newperson: Person){
    if(this.registrieren){
      this.addPerson(newperson);
    }else{
      this.getPerson(newperson.username, newperson.password);
    }
  }
  public getPerson(username: string, password: string):void{
    this.personservice.getPersonByUsernameAndPassword(username, password).subscribe(
      (response: Person)=> {
        this.person = response;
        this.isLogedIn = true;
      },
      (error : HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }
  public addPerson(newperson: Person){
    this.personservice.addPerson(newperson).subscribe(
      (response: Person) =>{
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
        this.registrieren = false;
        this.titelLogin = "Login";
        this.registrierenClass = "invisible";
        this.registrierenLinkClass = "registrierenLink";
    }
}
