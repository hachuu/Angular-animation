import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcelComponent } from './excel.component';
import { ExcelService } from './excel.service';
import { SharemoduleModule } from '../sharemodule/sharemodule.module';



@NgModule({
  declarations: [
    ExcelComponent
  ],
  imports: [
    SharemoduleModule
  ],
  providers: [
    ExcelService
  ]
})
export class ExcelModule { }
