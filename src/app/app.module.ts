import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps
 } from '@ionic-native/google-maps';
 import { Toast } from '@ionic-native/toast';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SightingPage } from '../pages/sighting/sighting';
import { SightingDetailPage } from '../pages/sighting-detail/sighting-detail';
import { SightingExtraDetailPage } from '../pages/sighting-extra-detail/sighting-extra-detail';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WildlifeProvider } from '../providers/wildlife/wildlife';
import { HistoryPage } from '../pages/history/history';
import { ImageListPage } from '../pages/image-list/image-list';
import { CreatureListPage } from '../pages/creature-list/creature-list';
import { CreatureListDetailPage } from '../pages/creature-list-detail/creature-list-detail';
import { SortCreaturesPipe } from '../pipes/sort-creatures/sort-creatures';
import { SightingsForCreaturePage } from '../pages/sightings-for-creature/sightings-for-creature';
import { SightingsForCreatureStatsPage } from '../pages/sightings-for-creature-stats/sightings-for-creature-stats';
import { ImagesForCreaturePage } from '../pages/images-for-creature/images-for-creature';
import { PipesModule } from '../pipes/pipes.module';
import { ChartsModule } from 'ng2-charts';
import { FlightTimesPage } from '../pages/flight-times/flight-times';
import { FlightTimeComponent } from '../components/flight-time/flight-time';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SightingPage,
    SightingDetailPage,
    SightingExtraDetailPage,
    HistoryPage,
    ImageListPage,
    CreatureListPage,
    CreatureListDetailPage,
    SightingsForCreaturePage,
    SightingsForCreatureStatsPage,
    ImagesForCreaturePage,
    FlightTimesPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    PipesModule,
    ChartsModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SightingPage,
    SightingDetailPage,
    SightingExtraDetailPage,
    HistoryPage,
    ImageListPage,
    CreatureListPage,
    CreatureListDetailPage,
    SightingsForCreaturePage,
    SightingsForCreatureStatsPage,
    ImagesForCreaturePage,
    FlightTimesPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WildlifeProvider,
    Geolocation,
    GoogleMaps,
    Toast
  ]
})
export class AppModule {}
