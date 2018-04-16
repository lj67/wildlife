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
    HistoryPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
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
    HistoryPage
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
