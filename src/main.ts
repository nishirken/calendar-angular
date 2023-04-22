import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as dayjs from 'dayjs';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import 'wired-elements/lib/wired-calendar.js';
import 'wired-elements/lib/wired-input.js';
import 'wired-elements/lib/wired-button.js';
import 'wired-elements/lib/wired-link.js';

if (environment.production) {
  enableProdMode();
}

dayjs.locale({
  name: 'eu',
  weekStart: 1,
  relativeTime: {},
  formats: {},
});

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
