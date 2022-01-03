import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/slide', pathMatch: 'full' },
  { path: 'slide', loadChildren: () => import( './slide/slide.module').then(m => m.SlideModule)},
  { path: 'animation', loadChildren: () => import( './animation-builder/animation-builder.module').then(m => m.AnimationBuilderModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
