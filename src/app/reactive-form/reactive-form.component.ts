import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss'],
  standalone: false,
})
export class ReactiveFormComponent implements OnInit {


  form = this.fb.group({
    lessons: this.fb.array([])
  });

  constructor(private fb: FormBuilder) {
    this.form.controls.lessons.valueChanges.subscribe(x=> {

      console.log(x);

    })
   }

  get lessons() {
    return this.form.controls["lessons"] as FormArray;
  }

  addLesson() {
    const lessonForm = this.fb.group({
      title: ['', {validators: Validators.required, updateOn: 'blur',}],
      // title: ['', {validators: Validators.required, updateOn: 'blur', asyncValidators: [courseTitleValidator(this.courses)],}],
      level: ['beginner', Validators.required]
    });
    this.lessons.push(lessonForm);
  }

  deleteLesson(lessonIndex: number) {
    this.lessons.removeAt(lessonIndex);
  }

  ngOnInit(): void {
  }

}
