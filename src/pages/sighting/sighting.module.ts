import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SightingPage } from './sighting';

@NgModule({
  declarations: [
    SightingPage,
  ],
  imports: [
    IonicPageModule.forChild(SightingPage),
  ],
})
export class SightingPageModule {}
