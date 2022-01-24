import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimationBuilderRoute } from './animation-builder/animation-builder.route';
import { ExcelRoutes } from './excel/excel.component.route';
import { FormRoutes } from './form/form.component.route';

const routes: Routes = [
  ...AnimationBuilderRoute,
  { path: 'slide', loadChildren: () => import('./slide/slide.module').then(m => m.SlideModule) },
  { path: 'tab-slide', loadChildren: () => import('./tab-slide/tab-slide.module').then(m => m.TabSlideModule) },
  { path: '', redirectTo: '/animation', pathMatch: 'full' },
  ...FormRoutes,
  ...ExcelRoutes,
  { path: 'googleMap', loadChildren: () => import('./agmap/agmap.module').then(m => m.AgmapModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
