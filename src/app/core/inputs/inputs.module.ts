import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectInputComponent } from './select/select.component';


@NgModule({
  declarations: [
    SelectInputComponent
  ],
  imports: [
    CommonModule,
    CommonModule
  ],
  exports:[
      SelectInputComponent
  ]
})
export class InputModule {}