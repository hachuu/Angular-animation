import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { SlideModule } from './slide/slide.module';
import { AnimationBuilderModule } from './animation-builder/animation-builder.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';

@NgModule({
  imports:      [
    AppRoutingModule,
    CommonModule,
    environment.production ? BrowserAnimationsModule : NoopAnimationsModule,
    FormsModule,
    SlideModule,
    AnimationBuilderModule
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AppModule { }
