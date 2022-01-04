import { NgModule } from '@angular/core';
import { AnimationBuilderComponent } from './animation-builder.component';
import { RouterModule } from '@angular/router';
import { SharemoduleModule } from '../sharemodule/sharemodule.module';


@NgModule({
  declarations: [
    AnimationBuilderComponent
  ],
  imports: [
    SharemoduleModule,
    RouterModule.forChild([
      { path: '', component: AnimationBuilderComponent }
    ]),
  ],
  exports: [
    RouterModule,
  ]
})
export class AnimationBuilderToggleModule { }
