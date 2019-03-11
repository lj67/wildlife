import { NgModule } from '@angular/core';
import { FlightTimeComponent } from './flight-time/flight-time';
import { BrowserModule } from '@angular/platform-browser';
import { PipesModule } from '../pipes/pipes.module';
@NgModule({
	declarations: [FlightTimeComponent],
	imports: [BrowserModule, PipesModule],
	exports: [FlightTimeComponent]
})
export class ComponentsModule {}
