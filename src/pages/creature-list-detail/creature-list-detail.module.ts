import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatureListDetailPage } from './creature-list-detail';

@NgModule({
  declarations: [
    CreatureListDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatureListDetailPage),
  ],
})
export class CreatureListDetailPageModule {}
