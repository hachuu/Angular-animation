import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcelComponent } from './excel.component';
import { ExcelService } from './excel.service';
import { SharemoduleModule } from '../sharemodule/sharemodule.module';
import { AutocompleteInputModule } from '../autocomplete-input/autocomplete-input.module';



@NgModule({
  declarations: [
    ExcelComponent
  ],
  imports: [
    SharemoduleModule,
    AutocompleteInputModule
  ],
  providers: [
    ExcelService
  ]
})
export class ExcelModule { }
