import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Homework } from './homework';
import { HomeworkService } from './homework.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  public homeworks: Homework[] = [];  
  constructor(private homeworkService: HomeworkService) { };
  ngOnInit(): void {
    this.getHomeworks();
  }
  today = new Date();
  startDate = new Date(this.today.getFullYear(),0,1);
  days = Math.floor((this.today.getTime() - this.startDate.getTime()) /(24 * 60 * 60 * 1000));
  week = Math.ceil(this.days / 7);
  
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
}