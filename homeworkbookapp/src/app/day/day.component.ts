import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';;
import { Homework } from '../homework';
import { HomeworkService } from '../homework.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit{ 
  public homeworks: Homework[] = [];  
  weekdays =  ["Monday", "Tuesday","Wednesday","Thursday","Friday","Weekend"];
  
  constructor(private appComponent: AppComponent, private homeworkService: HomeworkService ) {};
  @Input() day!: Date;
  weekday = this.weekdays[this.day.getDay()-1];
  ngOnInit(): void {
    this.appComponent;
    this.getHomeworks();
  }
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
