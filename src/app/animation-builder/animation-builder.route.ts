import { Routes } from '@angular/router';

export const AnimationBuilderRoute: Routes = [
  { path: 'animation', pathMatch: 'full', loadChildren: () => import( './animation-builder.module').then(m => m.AnimationBuilderToggleModule)}
];