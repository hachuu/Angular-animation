import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "time-picker",
  templateUrl: "./time-picker.component.html",
  styleUrls: ["./time-picker.component.scss"],
})
export class TimePickerComponent implements OnInit {
  @Input() time?: string;
  timeForm: FormGroup;
  pickerActive = false;
  constructor() {
    this.timeForm = new FormGroup({
      //00에서 23사이 pattern
      hour: new FormControl("00", [
        Validators.pattern("^[0-1][0-9]|[2][0-4]$"),
      ]),
      minutes: new FormControl("00", [Validators.pattern("^[0-5][0-9]$")]),
    });
  }

  ngOnInit(): void {}

  ngOnChanges(change: SimpleChanges) {
    if (change["time"]) {
      const time = change["time"].currentValue;
      if (time) {
        const timeArray = time.split(":");
        this.timeForm.get("hour")?.setValue(timeArray[0]);
        this.timeForm.get("minutes")?.setValue(timeArray[1]);
      }
    }
  }

  onHourChange(event: any) {
    event.stopPropagation();
    event.preventDefault();
    if (event.target.value.length === 2 && this.timeForm.get("hour")?.invalid) {
      this.timeForm.get("hour")?.setValue("");
    }
  }

  onMinutesChange(event: any) {
    event.stopPropagation();
    event.preventDefault();
    if (
      event.target.value.length === 2 &&
      this.timeForm.get("minutes")?.invalid
    ) {
      this.timeForm.get("minutes")?.setValue("");
    }
  }

  subtractHour() {
    const hour = this.timeForm.get("hour")?.value;
    if (hour && parseInt(hour) > 0) {
      const newHour =
        parseInt(hour) - 1 < 10
          ? "0" + (parseInt(hour) - 1)
          : parseInt(hour) - 1;
      this.timeForm.get("hour")?.setValue(newHour);
    }
  }
  subtractMinutes() {
    const minutes = this.timeForm.get("minutes")?.value;
    if (minutes && parseInt(minutes) > 0) {
      const newMinutes =
        parseInt(minutes) - 1 < 10
          ? "0" + (parseInt(minutes) - 1)
          : parseInt(minutes) - 1;
      this.timeForm.get("minutes")?.setValue(newMinutes);
    }
  }

  plusHour() {
    const hour = this.timeForm.get("hour")?.value;
    if (hour) {
      if (parseInt(hour) < 23) {
        const newHour =
          parseInt(hour) + 1 < 10
            ? "0" + (parseInt(hour) + 1)
            : parseInt(hour) + 1;
        this.timeForm.get("hour")?.setValue(newHour);
      } else {
        this.timeForm.get("hour")?.setValue("00");
      }
    }
  }

  plusMinutes() {
    const minutes = this.timeForm.get("minutes")?.value;
    if (minutes) {
      if (parseInt(minutes) < 59) {
        const newMinutes =
          parseInt(minutes) + 1 < 10
            ? "0" + (parseInt(minutes) + 1)
            : parseInt(minutes) + 1;
        this.timeForm.get("minutes")?.setValue(newMinutes);
      } else {
        this.timeForm.get("minutes")?.setValue("00");
      }
    }
  }
}
