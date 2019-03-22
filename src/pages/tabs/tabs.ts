import { Component } from '@angular/core';

import { SightingPage } from '../sighting/sighting';
import { CreatureListPage } from '../creature-list/creature-list';
import { HistoryPage } from '../history/history';
import { ImageListPage } from '../image-list/image-list';
import { MenuPage } from '../menu/menu';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = SightingPage;
  tab2Root = CreatureListPage;
  tab3Root = HistoryPage;
  tab4Root = ImageListPage;
  tab5Root = MenuPage;

  constructor() {

  }

  tabChanged($ev) {
    $ev.setRoot($ev.root);
  }
}
