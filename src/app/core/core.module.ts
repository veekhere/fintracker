import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UiKitModule } from '../ui-kit/ui-kit.module';
import { ButtonSelectComponent } from './components/inputs/button-select/button-select.component';
import { FilterPipe } from './pipes/filter.pipe';

const inputs = [
  ButtonSelectComponent
];

const pipes = [
  FilterPipe
];

@NgModule({
  declarations: [
    ...inputs,
    ...pipes,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiKitModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    UiKitModule,
    ...inputs,
    ...pipes,
  ]
})
export class CoreModule {}
