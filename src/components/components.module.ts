import { NgModule } from '@angular/core';
import { FlightTimeComponent } from './flight-time/flight-time';
import { BrowserModule } from '@angular/platform-browser';
import { PipesModule } from '../pipes/pipes.module';
import { SightingsListComponent } from './sightings-list/sightings-list';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { ImageListComponent } from './image-list/image-list';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { StarRatingModule } from 'ionic3-star-rating';

@NgModule({
	declarations: [FlightTimeComponent,
    SightingsListComponent,
    ImageListComponent],
	imports: [BrowserModule, PipesModule, IonicImageViewerModule,StarRatingModule, IonicModule.forRoot(SightingsListComponent, CommonModule)],
	exports: [FlightTimeComponent,
    SightingsListComponent,
    ImageListComponent]
})
export class ComponentsModule {}
