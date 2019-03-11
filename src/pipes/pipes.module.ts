import { NgModule } from '@angular/core';
import { SortCreaturesPipe } from './sort-creatures/sort-creatures';
import { SafePipe } from './safe/safe';
@NgModule({
	declarations: [SortCreaturesPipe,
    SafePipe],
	imports: [],
	exports: [SortCreaturesPipe,
    SafePipe]
})
export class PipesModule {}
