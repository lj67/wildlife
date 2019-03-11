import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { SightingPage } from '../sighting/sighting';
import { CreatureListPage } from '../creature-list/creature-list';
import { HistoryPage } from '../history/history';
import { ImageListPage } from '../image-list/image-list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = SightingPage;
  tab2Root = CreatureListPage;
  tab3Root = HistoryPage;
  tab4Root = ImageListPage;

  constructor() {

  }
}
