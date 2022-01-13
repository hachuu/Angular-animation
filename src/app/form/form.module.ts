import { NgModule } from '@angular/core';
import { FormComponent } from './form.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharemoduleModule } from '../sharemodule/sharemodule.module';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    DragDropModule,
    SharemoduleModule,
    MatExpansionModule
  ]
})
export class FormModule { }
