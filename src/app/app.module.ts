import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AnimationBuilderToggleModule } from './animation-builder/animation-builder.module';
import { AppRoutingModule } from './app-routing.module';
import { SlideModule } from './slide/slide.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports:      [ 
    AppRoutingModule,
    BrowserModule, 
    BrowserAnimationsModule, 
    AnimationBuilderToggleModule,
    SlideModule
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  // exports: [environment.production ? BrowserAnimationsModule : NoopAnimationsModule,]
})
export class AppModule { }
