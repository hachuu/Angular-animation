import { Routes } from '@angular/router';

export const AnimationBuilderRoute: Routes = [
  { path: 'animation', loadChildren: () => import( './animation-builder.module').then(m => m.AnimationBuilderModule)}
];