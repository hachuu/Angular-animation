import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AnimationBuilderToggleModule } from './animation-builder/animation-builder.module';
import { AppRoutingModule } from './app-routing.module';
import { SlideModule } from './slide/slide.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabSlideModule } from './tab-slide/tab-slide.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormModule } from './form/form.module';
import { ExcelModule } from './excel/excel.module';
import { SharemoduleModule } from './sharemodule/sharemodule.module';
import { ModalDirectiveDirective } from './modal-directive.directive';
import { ModalDirective } from './modal.directive';

@NgModule({
  imports:      [ 
    AppRoutingModule,
    BrowserModule, 
    BrowserAnimationsModule, 
    AnimationBuilderToggleModule,
    SlideModule,
    TabSlideModule,
    DragDropModule,
    ExcelModule,
    SharemoduleModule,
  ],
  declarations: [ AppComponent, ModalDirectiveDirective, ModalDirective ],
  bootstrap:    [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  // exports: [environment.production ? BrowserAnimationsModule : NoopAnimationsModule,]
})
export class AppModule { }
