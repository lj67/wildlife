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
import { LocationEditPage } from '../pages/location-edit/location-edit';
import { MenuPage } from '../pages/menu/menu';
import { LocationDetailPage } from '../pages/location-detail/location-detail';
import { LocationsPage } from '../pages/locations/locations';
import { SightingsForLocationPage } from '../pages/sightings-for-location/sightings-for-location';
import { LocationStatsPage } from '../pages/location-stats/location-stats';
import { MapPage } from '../pages/map/map';
import { ButterflySearchPage } from '../pages/butterfly-search/butterfly-search';
import { ClassListPage } from '../pages/class-list/class-list';
import { ImageDetailPage } from '../pages/image-detail/image-detail';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { ImageTaggerPage } from '../pages/image-tagger/image-tagger';
import { FlightTimesListPage } from '../pages/flight-times-list/flight-times-list';
import { StatsPage } from '../pages/stats/stats';

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
    FlightTimesPage,
    LocationEditPage,
    MenuPage,
    LocationDetailPage,
    LocationsPage,
    SightingsForLocationPage,
    LocationStatsPage,
    MapPage,
    ButterflySearchPage,
    ClassListPage,
    ImageDetailPage,
    ImageTaggerPage,
    FlightTimesListPage,
    StatsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    PipesModule,
    ChartsModule,
    ComponentsModule,
    IonicImageViewerModule
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
    FlightTimesPage,
    LocationEditPage,
    MenuPage,
    LocationDetailPage,
    LocationsPage,
    SightingsForLocationPage,
    LocationStatsPage,
    MapPage,
    ButterflySearchPage,
    ClassListPage,
    ImageDetailPage,
    ImageTaggerPage,
    FlightTimesListPage,
    StatsPage

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
