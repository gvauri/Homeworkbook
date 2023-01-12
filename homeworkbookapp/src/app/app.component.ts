import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Homework } from './homework';
import { HomeworkService } from './homework.service';
import { ModalService } from './_modal';
import {FormGroup, FormControl, NgForm} from '@angular/forms';
import { LoginService } from './login.service';
import { DayComponent } from './day/day.component';
import { MatSnackBarLabel } from '@angular/material/snack-bar';
import { Edit } from './edit';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  public stateWindow = 0;
  public editHomeworkid = 0;
  public editHomework?: Homework;
  public homeworks: Homework[] = [];  
  updateForm: any;
  person: any;
  public getScreenWidth: any;
  public getScreenHeight: any;
  constructor(private homeworkService: HomeworkService, public modalService: ModalService, public loginService: LoginService) { };
  edit: Edit = {
    "stateWindow":0,
  };
  ngOnInit(): void {
    this.loginService.getSession()
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  public stringToBoolean():boolean{
      return false;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    if(this.getScreenWidth <= 500){
      this.edit.stateWindow = 1;
    }
  }
  
  
  today = new Date();
  startDate = new Date(this.today.getFullYear(),0,1);
  days = Math.floor((this.today.getTime() - this.startDate.getTime()) /(24 * 60 * 60 * 1000));
  week = Math.ceil(this.days / 7);
  monday = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()+1-this.today.getDay());
  tuesday =new Date(this.monday.getFullYear(), this.monday.getMonth(), this.monday.getDate()+1);
  wednesday =new Date(this.monday.getFullYear(), this.monday.getMonth(), this.monday.getDate()+2);
  thursday =new Date(this.monday.getFullYear(), this.monday.getMonth(), this.monday.getDate()+3);
  friday =new Date(this.monday.getFullYear(), this.monday.getMonth(), this.monday.getDate()+4);
  weekend =new Date(this.monday.getFullYear(), this.monday.getMonth(), this.monday.getDate()+5);

 
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  public nextWeek():void{
    if(this.edit.stateWindow == 0){
    this.today = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()+7);
    this.startDate = new Date(this.today.getFullYear(),0,1);
    this.days = Math.floor((this.today.getTime() - this.startDate.getTime()) /(24 * 60 * 60 * 1000));
    this.week = Math.ceil(this.days / 7);
    this.monday = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()+1-this.today.getDay());
    this.tuesday =new Date(this.monday.getFullYear(), this.monday.getMonth(), this.monday.getDate()+1);
    this.wednesday =new Date(this.monday.getFullYear(), this.monday.getMonth(), this.monday.getDate()+2);
    this.thursday =new Date(this.monday.getFullYear(), this.monday.getMonth(), this.monday.getDate()+3);
    this.friday =new Date(this.monday.getFullYear(), this.monday.getMonth(), this.monday.getDate()+4);
    this.weekend =new Date(this.monday.getFullYear(), this.monday.getMonth(), this.monday.getDate()+5);
  }else if(this.edit.stateWindow == 1){
    this.today = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()+1);
    if(this.today.getDay() == 0){
      this.today = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()+1); 

    }
  }
  }
  public lastWeek():void{
    if(this.edit.stateWindow == 0){
    this.today = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()-7);
    this.startDate = new Date(this.today.getFullYear(),0,1);
    this.days = Math.floor((this.today.getTime() - this.startDate.getTime()) /(24 * 60 * 60 * 1000));
    this.week = Math.ceil(this.days / 7);
    this.monday = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()+1-this.today.getDay());
    this.tuesday =new Date(this.monday.getFullYear(), this.monday.getMonth(), this.monday.getDate()+1);
    this.wednesday =new Date(this.monday.getFullYear(), this.monday.getMonth(), this.monday.getDate()+2);
    this.thursday =new Date(this.monday.getFullYear(), this.monday.getMonth(), this.monday.getDate()+3);
    this.friday =new Date(this.monday.getFullYear(), this.monday.getMonth(), this.monday.getDate()+4);
    this.weekend =new Date(this.monday.getFullYear(), this.monday.getMonth(), this.monday.getDate()+5);
  }else if(this.edit.stateWindow == 1){
    this.today = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()-1); 
    if(this.today.getDay() == 0){
      this.today = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()-1); 

    }
  }
  }

  public getHomeworks():void  {
    this.homeworkService.getHomeworksbyUserID().subscribe(
      (response : Homework[]) => {
        this.homeworks = response;
      },
      (error : HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

  public addHomework(homework: Homework):void{
    document.getElementById('add-homework-form')?.click()
    this.homeworkService.addHomework(homework).subscribe(
      (response: Homework) => {
        console.log(response);
        this.getHomeworks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public updateHomework(homework: Homework): void {
    this.homeworkService.updateHomework(homework).subscribe(
      (response: Homework) => {
        console.log(response);
        this.getHomeworks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public editSettings(editH: Edit): void {
    this.edit.stateWindow = editH.stateWindow;
  }

  public getHomeworkByID(homeworkID: number):void{
    this.homeworkService.getHomeworkByID(homeworkID).subscribe(
      (response: Homework)=> {
        this.editHomework = response;
      },
      (error : HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }
}
