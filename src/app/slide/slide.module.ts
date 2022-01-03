import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideComponent } from './slide.component';
import { HelloComponent } from './hello/hello.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SlideComponent,
    HelloComponent,
    ImageSliderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: SlideComponent }
    ]),
  ],
  exports: [
    RouterModule
  ]
})
export class SlideModule { }
