import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimationBuilderRoute } from './animation-builder/animation-builder.route';
import { ExcelRoutes } from './excel/excel.component.route';
import { FormRoutes } from './form/form.component.route';
import { PrintRoutes } from './print/print.component.route';
import { ReactiveFormRoute } from './reactive-form/reactive-form.component.route';

const routes: Routes = [
  ...AnimationBuilderRoute,
  { path: 'slide', loadChildren: () => import('./slide/slide.module').then(m => m.SlideModule) },
  { path: 'tab-slide', loadChildren: () => import('./tab-slide/tab-slide.module').then(m => m.TabSlideModule) },
  { path: '', redirectTo: '/animation', pathMatch: 'full' },
  ...FormRoutes,
  ...ExcelRoutes,
  ...PrintRoutes,
  ...ReactiveFormRoute,
  // { path: 'googleMap', loadChildren: () => import('./agmap/agmap.module').then(m => m.AgmapModule) },
  { path: 'websocket', loadChildren: () => import('./websocket/websocket.module').then(m => m.WebsocketModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
