import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { SightingPage } from '../sighting/sighting';
import { CreatureListPage } from '../creature-list/creature-list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = SightingPage;
  tab2Root = CreatureListPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
