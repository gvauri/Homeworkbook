import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from './person';
import { Personservice } from './person.service';
import { ModalService } from './_modal';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public registrierenClass = "invisible";
  public registrierenLinkClass = "registrierenLink";
  public titelLogin = "Login";
  constructor(private personservice: Personservice, private modalService: ModalService) { }
  public userID?: number;
  public person?: Person;
  public isLogedIn: boolean = false;
  public registrieren: boolean = false;
  password!:string;
  username!:string;
  session :any;
  public errors: string[] = [];
  public setUserId():void{
    this.userID = this.person?.userID;
  }
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
        this.userID = response.userID;
        this.isLogedIn = true;
        this.modalService.close('modal-login')
        let data = {password: password, username: username, isLogedIn: this.isLogedIn}
        localStorage.setItem('password', password)
        localStorage.setItem('username', username)
        localStorage.setItem('islogedIn', true.toString())
      },
      (error : HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

  gaga?:string;

  public getSession():boolean{
    if(localStorage.getItem('islogedIn')== 'true'){
        this.getPerson(localStorage.getItem("username")?.replace('"','').replace('"','') ?? "", localStorage.getItem('password')?.replace('"','').replace('"','') ?? "")
      return true;
    }else{
      return false;
    }
  }


  public addPerson(newperson: Person){
    if(newperson)


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
    public signOut(){
      localStorage.setItem('islogedIn', false.toString())
      this.isLogedIn = false;
    }
}

