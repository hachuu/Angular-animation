import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { AutocompleteInputComponent } from './autocomplete-input.component';
import { SharemoduleModule } from 'src/app/sharemodule/sharemodule.module';

@NgModule({
  declarations: [
    AutocompleteInputComponent
  ],
  imports: [
    SharemoduleModule
  ],
  exports: [
    AutocompleteInputComponent
 ]
})
export class AutocompleteInputModule { }
