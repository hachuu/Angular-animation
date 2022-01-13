import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimationBuilderRoute } from './animation-builder/animation-builder.route';
import { FormRoutes } from './form/form.component.route';

const routes: Routes = [
  ...AnimationBuilderRoute,
  { path: 'slide', loadChildren: () => import('./slide/slide.module').then(m => m.SlideModule) },
  { path: 'tab-slide', loadChildren: () => import('./tab-slide/tab-slide.module').then(m => m.TabSlideModule) },
  { path: '', redirectTo: '/animation', pathMatch: 'full' },
  ...FormRoutes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
