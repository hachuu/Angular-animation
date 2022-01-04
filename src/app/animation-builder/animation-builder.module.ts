import { NgModule } from '@angular/core';
import { AnimationBuilderComponent } from './animation-builder.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { AnimationBuilder } from '@angular/animations';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    AnimationBuilderComponent
  ],
  imports: [
    // NoopAnimationsModule,
    // CommonModule,
    RouterModule.forChild([
      { path: '', component: AnimationBuilderComponent }
    ]),
  ],
  exports: [
    RouterModule
  ]
})
export class AnimationBuilderModule { }
