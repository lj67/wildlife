import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatureListPage } from './creature-list';

@NgModule({
  declarations: [
    CreatureListPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatureListPage),
  ],
})
export class CreatureListPageModule {}
