import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimationBuilderRoute } from './animation-builder/animation-builder.route';

const routes: Routes = [
  { path: '', redirectTo: '/slide', pathMatch: 'full' },
  { path: 'slide', loadChildren: () => import( './slide/slide.module').then(m => m.SlideModule)},
  ...AnimationBuilderRoute
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
