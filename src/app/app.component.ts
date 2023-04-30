import { Component } from '@angular/core';
import { AppConstants } from '@app-constants';
import { LocalStorageService } from '@core/services/local-storage.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';

@UntilDestroy()
@Component({
  selector: 'fin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    translateService: TranslateService,
    localStorageService: LocalStorageService,
  ) {
    translateService.addLangs(Object.values(AppConstants.LANGUAGES));

    const savedLanguage = localStorageService.getItem(AppConstants.KEYS.LANGUAGE);
    if (savedLanguage) {
      translateService.setDefaultLang(savedLanguage);
    } else {
      const browserLanguage = translateService.getBrowserLang() ?? AppConstants.LANGUAGES.EN;
      if (browserLanguage.toUpperCase() in AppConstants.LANGUAGES) {
        translateService.use(browserLanguage);
      }
      localStorageService.setItem(AppConstants.KEYS.LANGUAGE, browserLanguage);
    }

    translateService.onLangChange
      .pipe(untilDestroyed(this))
      .subscribe((params) => localStorageService.setItem(AppConstants.KEYS.LANGUAGE, params.lang));
  }
}
