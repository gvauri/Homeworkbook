import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';;
import { Homework } from '../homework';
import { HomeworkService } from '../homework.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Output, EventEmitter } from '@angular/core';
import { ModalService } from '../_modal';
@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit{
  
  public homeworks: Homework[] = [];  
  weekdays =  ["Monday", "Tuesday","Wednesday","Thursday","Friday","Weekend"];
  constructor(private appComponent: AppComponent, private homeworkService: HomeworkService,  public modalService: ModalService){};


  @Input() day!: Date;

  public convertToDate(dueDate : string): Date{
    const year = dueDate.charAt(0)+dueDate.charAt(1)+dueDate.charAt(2)+dueDate.charAt(3);
    const day = dueDate.charAt(8)+dueDate.charAt(9);
    const month =  dueDate.charAt(5)+dueDate.charAt(6);

    return new Date( Number(year), Number(month)-1, Number(day));
  }

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
  public setEditHomework(homework: Homework){
    this.appComponent.editHomeworkid = homework.homeworkID;
    this.modalService.open('modal-update');
    this.appComponent.getHomeworkByID(homework.homeworkID);
  }
}
