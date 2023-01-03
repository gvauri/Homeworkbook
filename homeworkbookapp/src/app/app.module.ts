import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeworkService } from './homework.service';
import { DayComponent } from './day/day.component';
import { DaysDirective } from './days.directive';
import { ModalModule } from './_modal';
import {MaterialExampleModule} from '../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    DayComponent,
    DaysDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    
  ],
  providers: [HomeworkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
