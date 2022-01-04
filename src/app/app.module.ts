import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AnimationBuilderToggleModule } from './animation-builder/animation-builder.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports:      [ 
    AppRoutingModule,
    BrowserModule, 
    BrowserAnimationsModule, 
    FormsModule,
    AnimationBuilderToggleModule
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
