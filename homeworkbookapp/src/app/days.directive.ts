import { Directive } from '@angular/core';

@Directive({
  selector: '[appDays]'
})
export class DaysDirective {

  constructor() { }
  day = new Date;
}
