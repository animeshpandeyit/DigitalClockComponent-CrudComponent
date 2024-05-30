import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-digital-clock',
  templateUrl: './digital-clock.component.html',
  styleUrl: './digital-clock.component.css',
})
export class DigitalClockComponent implements OnInit {
  currentTime: string | undefined;

  clock: FormGroup;

  constructor(
    private cdr: ChangeDetectorRef,
    private _formBuilder: FormBuilder
  ) {
    this.clock = this._formBuilder.group({
      clock: [''],
    });
  }

  ngOnInit(): void {
    this.getClock();
    setInterval(() => {
      this.getClock();
      this.cdr.detectChanges();
    }, 1000);
  }

  time: any;

  getClock() {
    this.time = new Date();
    let hour = this.time.getHours();
    let minute = this.time.getMinutes();
    let second = this.time.getSeconds();
    let am_pm = 'AM';

    if (hour >= 12) {
      if (hour > 12) hour -= 12;
      am_pm = 'PM';
    } else if (hour == 0) {
      hour = 12;
      am_pm = 'AM';
    }

    // hour = hour < 12 ? '0' + hour : hour;
    // minute = minute < 12 ? '0' + minute : minute;
    // second = second < 12 ? '0' + second : second;

    /**
     * The function `padding` takes a number as input and returns a string representation of the number
     * with a leading zero if the number is less than 10.
     * @param {number} num - The `num` parameter is a number that is being passed to the `padding`
     * function.
     */
    const padding = (num: number) => (num < 10 ? '0' + num : num);

    // let currentTime = hour + ':' + minute + ':' + second;

    this.currentTime = `${padding(hour)}:${padding(minute)}:${padding(
      second
    )} ${am_pm}`;
  }

  clockSubmit() {
    // console.log(this.clock.value.clock);
    // this.clock.patchValue(this.currentTime)

    this.clock.patchValue({ clock: this.currentTime });
    console.log(this.clock.value.clock);
  }
}
// let currentTime = new Date(hour, minute, second);
