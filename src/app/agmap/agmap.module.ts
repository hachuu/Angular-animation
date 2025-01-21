// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { AgmapComponent } from './agmap.component';
// import { RouterModule } from '@angular/router';
// import { SharemoduleModule } from '../sharemodule/sharemodule.module';
// import { AgcoreComponent } from './agcore/agcore.component';
// import { AgmCoreModule } from '@agm/core';
// import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
// import { environment } from 'src/environments/environment';

// @NgModule({
//   declarations: [
//     AgmapComponent,
//     AgcoreComponent
//   ],
//   imports: [
//     SharemoduleModule,
//     AgmCoreModule.forRoot({
//       apiKey: environment.gmapApiKey,
//       libraries: ["places", "geometry"],
//       region: 'KR'
//     }),
//     AgmSnazzyInfoWindowModule,
//     RouterModule.forChild([
//       { path: '', component: AgcoreComponent },
//       // { path: 'agcore', component: AgcoreComponent },
//     ]),
//   ],
//   exports: [
//     AgmapComponent,
//     AgcoreComponent
//   ]
// })
// export class AgmapModule { }

// // GoogleMapsModule,