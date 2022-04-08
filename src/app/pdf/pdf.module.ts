import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfComponent } from './pdf.component';
import { FormModule } from '../form/form.module';



@NgModule({
  declarations: [
    PdfComponent
  ],
  imports: [
    CommonModule,
    FormModule,
  ]
})
export class PdfModule { }
