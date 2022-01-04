import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { SlideModule } from './slide/slide.module';
import { AnimationBuilderToggleModule } from './animation-builder/animation-builder.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { SharemoduleModule } from './sharemodule/sharemodule.module';

@NgModule({
  imports:      [
    AppRoutingModule,
    BrowserModule,
    environment.production ? BrowserAnimationsModule : NoopAnimationsModule,
    // SlideModule,
    // AnimationBuilderToggleModule,
    FormsModule,
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  // exports: [environment.production ? BrowserAnimationsModule : NoopAnimationsModule,]
})
export class AppModule { }
