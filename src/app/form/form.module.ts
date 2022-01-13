import { NgModule } from '@angular/core';
import { FormComponent } from './form.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharemoduleModule } from '../sharemodule/sharemodule.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {OverlayModule} from '@angular/cdk/overlay';
import {ClipboardModule} from '@angular/cdk/clipboard';

@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    DragDropModule,
    SharemoduleModule,
    MatExpansionModule,
    OverlayModule,
    ClipboardModule
  ],
  // providers: [{provide: OverlayContainer}],
})
export class FormModule { }
