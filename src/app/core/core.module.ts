import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UiKitModule } from '../ui-kit/ui-kit.module';
import { ButtonSelectComponent } from './components/inputs/button-select/button-select.component';
import { FilterPipe } from './pipes/filter.pipe';
import { TextInputComponent } from './components/inputs/text-input/text-input.component';
import { HeaderComponent } from './components/common/header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/common/footer/footer.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UserButtonComponent } from './components/common/user-button/user-button.component';
import { UserSettingsModalComponent } from './components/common/user-settings-modal/user-settings-modal.component';
import { BadgeBorderColorDirective } from './components/directives/badge-border-color.directive';
import { NotificationBadgeComponent } from './components/common/notification-badge/notification-badge.component';
import { MenuButtonComponent } from './components/common/menu-button/menu-button.component';
import { CardComponent } from './components/common/card/card.component';
import { CaptureParentClassDirective } from './components/directives/capture-parent-class.directive';

const components = [
  HeaderComponent,
  FooterComponent,
  UserButtonComponent,
  UserSettingsModalComponent,
  NotificationBadgeComponent,
  MenuButtonComponent,
  CardComponent,
];

const directives = [
  BadgeBorderColorDirective,
  CaptureParentClassDirective,
];

const inputs = [
  TextInputComponent,
  ButtonSelectComponent
];

const pipes = [
  FilterPipe
];

function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    ...components,
    ...directives,
    ...inputs,
    ...pipes,
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    UiKitModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    UiKitModule,
    TranslateModule,
    ...components,
    ...directives,
    ...inputs,
    ...pipes,
  ]
})
export class CoreModule {}
