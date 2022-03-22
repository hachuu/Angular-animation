import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormModule } from '../form/form.module';
import { ReactiveFormComponent } from './reactive-form.component';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [ReactiveFormComponent],
  imports: [
    CommonModule,
    FormModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [ReactiveFormComponent],
  
})
export class ReactiveFormModule { }
