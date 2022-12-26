import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeworkService } from './homework.service';
import { DayComponent } from './day/day.component';
import { DaysDirective } from './days.directive';

@NgModule({
  declarations: [
    AppComponent,
    DayComponent,
    DaysDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [HomeworkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
