import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropFileDirective } from './drop-file.directive';
import { FocusDirective } from './focus.directive';
import { LabelCheckedDirective } from './label-checked.directive';
import { LabelRadioDirective } from './label-radio.directive';
import { ModalDirective } from './modal.directive';
import { SharemoduleModule } from 'src/app/sharemodule/sharemodule.module';
import { FormModule } from '../containers/common/form/form.module';
import { ExcelPasteDirective } from './excel-paste.directive';
import { DisabledActionDirective } from './disabled-action.directive';
import { FocusInDirective } from './focus-in.directive';
import { OnlyPatternDirective } from './only-pattern.directive';
import { TelDirective } from './tel.directive';
import { DateDirective } from './date.directive';
import { SetCommaDirective } from './set-comma.directive';



@NgModule({
  declarations: [
    DropFileDirective,
    FocusDirective,
    LabelCheckedDirective,
    LabelRadioDirective,
    ModalDirective,
    ExcelPasteDirective,
    DisabledActionDirective,
    FocusInDirective,
    OnlyPatternDirective,
    TelDirective,
    DateDirective,
    SetCommaDirective
  ],
  imports: [
    // SharemoduleModule,
    FormModule
  ],
  exports: [
    DropFileDirective,
    FocusDirective,
    LabelCheckedDirective,
    LabelRadioDirective,
    ModalDirective,
    ExcelPasteDirective,
    DisabledActionDirective,
    FocusInDirective,
    OnlyPatternDirective,
    TelDirective,
    DateDirective,
    SetCommaDirective
  ]
})
export class DirectiveModule { }
