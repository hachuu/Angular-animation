import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabSlideComponent } from './tab-slide.component';
import { SharemoduleModule } from '../sharemodule/sharemodule.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    TabSlideComponent
  ],
  imports: [
    SharemoduleModule,
    RouterModule.forChild([
      { path: '', component: TabSlideComponent }
    ]),
  ], 
  exports: [
    TabSlideComponent
  ]
})
export class TabSlideModule { }
