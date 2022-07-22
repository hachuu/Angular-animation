import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsocketComponent } from './websocket.component';
import { Router, RouterModule } from '@angular/router';
import { FormModule } from '../form/form.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    WebsocketComponent
  ],
  imports: [
    CommonModule,
    [RouterModule.forChild([
      { path: '', component: WebsocketComponent }
    ])],
    FormsModule,
  ],
  exports: [
    FormsModule
  ]
})
export class WebsocketModule { }
