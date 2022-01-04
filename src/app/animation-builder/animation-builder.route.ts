import { Routes } from '@angular/router';
import { AnimationBuilderComponent } from './animation-builder.component';

export const AnimationBuilderRoute: Routes = [
  { path: 'animation', loadChildren: () => import( './animation-builder.module').then(m => m.AnimationBuilderToggleModule)}
];