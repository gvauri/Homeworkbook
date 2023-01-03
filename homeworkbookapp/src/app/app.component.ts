import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Homework } from './homework';
import { HomeworkService } from './homework.service';
import { ModalService } from './_modal';
import {FormGroup, FormControl, NgForm} from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  public homeworks: Homework[] = [];  
  constructor(private homeworkService: HomeworkService, public modalService: ModalService) { };
  ngOnInit(): void {
    this.getHomeworks();
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

  public getHomeworks():void  {
    this.homeworkService.getHomeworks().subscribe(
      (response : Homework[]) => {
        this.homeworks = response;
      },
      (error : HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  public nextWeek():void{
    this.today = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()+7);
    this.monday = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()+1-this.today.getDay());
    this.tuesday =new Date(this.monday.getFullYear(), this.monday.getMonth(), this.monday.getDate()+1);
    this.wednesday =new Date(this.monday.getFullYear(), this.monday.getMonth(), this.monday.getDate()+2);
    this.thursday =new Date(this.monday.getFullYear(), this.monday.getMonth(), this.monday.getDate()+3);
    this.friday =new Date(this.monday.getFullYear(), this.monday.getMonth(), this.monday.getDate()+4);
    this.weekend =new Date(this.monday.getFullYear(), this.monday.getMonth(), this.monday.getDate()+5);
  }
  public lastWeek():void{
    this.today = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()-7);
    this.monday = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()+1-this.today.getDay());
    this.tuesday =new Date(this.monday.getFullYear(), this.monday.getMonth(), this.monday.getDate()+1);
    this.wednesday =new Date(this.monday.getFullYear(), this.monday.getMonth(), this.monday.getDate()+2);
    this.thursday =new Date(this.monday.getFullYear(), this.monday.getMonth(), this.monday.getDate()+3);
    this.friday =new Date(this.monday.getFullYear(), this.monday.getMonth(), this.monday.getDate()+4);
    this.weekend =new Date(this.monday.getFullYear(), this.monday.getMonth(), this.monday.getDate()+5);
  }
  public addHomework(addForm: NgForm):void{
    document.getElementById('add-homework-form')?.click()
    this.homeworkService.addHomework(addForm.value).subscribe(
      (response: Homework) => {
        console.log(response);
        this.getHomeworks();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
}