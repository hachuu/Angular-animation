import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AnimationBuilderToggleModule } from './animation-builder/animation-builder.module';
import { AppRoutingModule } from './app-routing.module';
import { SlideModule } from './slide/slide.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabSlideModule } from './tab-slide/tab-slide.module';
import { MessageComponent } from './message/message.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports:      [ 
    AppRoutingModule,
    BrowserModule, 
    BrowserAnimationsModule, 
    AnimationBuilderToggleModule,
    SlideModule,
    TabSlideModule,
    FormsModule,
  ],
  declarations: [ AppComponent, MessageComponent ],
  bootstrap:    [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  // exports: [environment.production ? BrowserAnimationsModule : NoopAnimationsModule,]
})
export class AppModule { }
